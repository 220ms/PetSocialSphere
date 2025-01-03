const UserModel = require("../Models/usersModel.js");
const { SessionModel } = require("../Models/sessionModel.js");
const VerificationCodeModel = require("../Models/verificationCodeModel.js");
const {
  oneYearFromNow,
  ONE_DAY_MS,
  thirtyDaysFromNow,
  fiveMinsAgo,
  oneHourFromNow,
} = require("../utils/date.js");
const { VerificationCode } = require("../constants/verificationCode.js");
const {
  getPasswordResetTemplate,
  getVerifyEmailTemplate,
} = require("../utils/emailTemplates.js");

const { sendMail } = require("../utils/sendMail.js");

const {
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  TOO_MANY_REQUESTS,
} = require("../constants/http.js");

const { hashValue } = require("../utils/bcrypt.js");

const { refreshTokenSignOptions } = require("../utils/jwt.js");

const { UNAUTHORIZED, CONFLIC } = require("../constants/http.js");

const { appAssert } = require("../utils/appAssert.js");
const { signToken, verifyToken } = require("../utils/jwt.js");

exports.createAccount = async (data) => {
  // verify existing user doesnt exist
  const existingUser = await UserModel.exists({ email: data.email });
  appAssert(!existingUser, CONFLICT, "Email already in use");
  // create user
  const user = await UserModel.create({
    fname: data.fname,
    sname: data.sname,
    email: data.email,
    password: data.password,
  });
  const userId = user._id;

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: VerificationCode.EmailVerification,
    expiresAt: oneYearFromNow(),
  });
  // send verification email
  const url = `${process.env.APP_ORIGIN}/auth/email/verify/${verificationCode._id}`;
  const { error } = await sendMail({
    to: user.email,
    ...getVerifyEmailTemplate(url),
  });
  if (error) {
    console.log(error);
  }
  //create session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent,
  });

  //sign access token & refresh token
  const refreshToken = signToken(
    { sessionId: session._id },
    refreshTokenSignOptions
  );
  //return user & tokens
  const accessToken = signToken({ userId: user._id, sessionId: session._id });

  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

exports.loginUser = async ({ email, password, userAgent }) => {
  // get the user by email
  const user = await UserModel.findOne({ email });
  appAssert(user, UNAUTHORIZED, "Invalid email or password");
  // validate password from the request
  const isValid = await user.comparePassword(password);
  console.log(isValid);
  appAssert(isValid, UNAUTHORIZED, "Invalid email or password");

  const userId = user._id;
  //create a session
  const session = await SessionModel.create({
    userId,
    userAgent,
  });
  const sessionInfo = {
    sessionId: session._id,
  };
  //sign access token & refresh token
  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);
  //return user & tokens
  const accessToken = signToken({ ...sessionInfo, userId: user._id });

  // return user & tokens
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

exports.refreshUserAccessToken = async (refreshToken) => {
  const { payload } = verifyToken(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });

  appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

  const session = await SessionModel.findById(payload.sessionId);
  const now = Date.now();
  appAssert(
    session && session.expiresAt.getTime() > now,
    UNAUTHORIZED,
    "Session expired"
  );

  // refresh the ssion if it expires in the next 24 hours
  const sessionNeedsRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;

  if (sessionNeedsRefresh) {
    session.expiresAt = thirtyDaysFromNow();
    await session.save();
  }
  const newRefreshToken = sessionNeedsRefresh
    ? signToken({ sessionId: session._id }, refreshTokenSignOptions)
    : undefined;
  const accessToken = signToken({
    userId: session.userId,
    sessionId: session._id,
  });

  return {
    accessToken,
    newRefreshToken,
  };
};

exports.verifyEmail = async (code) => {
  // get the verificaiton code
  const validCode = await VerificationCodeModel.findOne({
    _id: code,
    type: VerificationCode.EmailVerification,
    expiresAt: { $gt: new Date() },
  });
  appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");

  // update user to verifed to true
  const updatedUser = await UserModel.findByIdAndUpdate(
    validCode.userId,
    { verified: true },
    { new: true }
  );

  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to verify email");
  // delete verification code
  await validCode.deleteOne();
  // return user
  return {
    user: updatedUser.omitPassword(),
  };
};

exports.sendPasswordResetEmail = async (email) => {
  // Catch any errors that were thrown and log them (but always return a success)
  // This will prevent leaking sensitive data back to the client (e.g. user not found, email not sent).
  try {
    const user = await UserModel.findOne({ email });
    appAssert(user, NOT_FOUND, "User not found");

    // check for max password reset requests (2 emails in 5min)
    const fiveMinAgo = fiveMinsAgo();
    const count = await VerificationCodeModel.countDocuments({
      userId: user._id,
      type: VerificationCode.PasswordReset,
      createdAt: { $gt: fiveMinAgo },
    });
    appAssert(
      count <= 1,
      TOO_MANY_REQUESTS,
      "Too many requests, please try again later"
    );

    const expiresAt = oneHourFromNow();
    const verificationCode = await VerificationCodeModel.create({
      userId: user._id,
      type: VerificationCode.PasswordReset,
      expiresAt,
    });

    const url = `${process.env.APP_ORIGIN}/password/reset?code=${
      verificationCode._id
    }&exp=${expiresAt.getTime()}`;

    const { data, error } = await sendMail({
      to: email,
      ...getPasswordResetTemplate(url),
    });

    appAssert(
      data?.id,
      INTERNAL_SERVER_ERROR,
      `${error?.name} - ${error?.message}`
    );
    return {
      url,
      emailId: data.id,
    };
  } catch (error) {
    console.log("SendPasswordResetError:", error.message);
    return {};
  }
};

exports.resetPassword = async ({ password, verificationCode }) => {
  // get the verification code
  const validCode = await VerificationCodeModel.findOne({
    _id: verificationCode,
    type: VerificationCode.PasswordReset,
    expiresAt: { $gt: new Date() },
  });
  appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");
  // update the users password
  const updatedUser = await UserModel.findByIdAndUpdate(validCode.userId, {
    password: await hashValue(password),
  });

  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to reset password");
  //delete the verification code
  await validCode.deleteOne();

  // delete all sessions
  await SessionModel.deleteMany({ userId: updatedUser._id });

  return {
    user: updatedUser.omitPassword(),
  };
};
