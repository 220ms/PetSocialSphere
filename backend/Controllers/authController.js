const dotenv = require("dotenv");
dotenv.config();
const catchAsync = require("../utils/catchAsync.js");
const { CREATED } = require("../constants/http.js");
const {
  signupSchema,
  loginSchema,
  verificationCodeSchema,
  emailSchema,
  resetPasswordSchema,
} = require("../Schemas/authSchema.js");
const {
  createAccount,
  loginUser,
  verifyEmail,
  sendPasswordResetEmail,
  resetPassword,
  refreshUserAccessToken,
} = require("../services/authService.js");
const {
  setAuthCookies,
  clearAuthCookies,
  getRefreshTokenCookieOptions,
  getAccessTokenCookieOptions,
} = require("../utils/cookies.js");
const { OK, UNAUTHORIZED } = require("../constants/http.js");
const { verifyToken } = require("../utils/jwt.js");
const { SessionModel } = require("../Models/sessionModel.js");
const { appAssert } = require("../utils/appAssert.js");

exports.signupHandler = catchAsync(async (req, res, next) => {
  console.log("Received request for signup");

  const request = signupSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  // call service
  const { user, accessToken, refreshToken } = await createAccount(request);
  // send response.
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

exports.loginHandler = catchAsync(async (req, res, next) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { accessToken, refreshToken } = await loginUser(request);
  return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
    message: "Login successfull",
  });
});

exports.logoutHandler = catchAsync(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const { payload } = verifyToken(accessToken);
  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }
  return clearAuthCookies(res).status(OK).json({
    message: "Logout successfull",
  });
});

exports.refreshHandler = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

  const { accessToken, newRefreshToken } = await refreshUserAccessToken(
    refreshToken
  );

  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }
  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({
      message: "Access token refreshed",
    });
});

exports.verifyEmailHandler = catchAsync(async (req, res) => {
  const verificationCode = verificationCodeSchema.parse(req.params.code);

  await verifyEmail(verificationCode);

  return res.status(OK).json({
    message: "Email was successfully verified",
  });
});

exports.sendPasswordResetHandler = catchAsync(async (req, res) => {
  const email = emailSchema.parse(req.body.email);
  await sendPasswordResetEmail(email);
  return res.status(OK).json({
    message: "Password reset email sent",
  });
});

exports.resetPasswordHandler = catchAsync(async (req, res) => {
  const request = resetPasswordSchema.parse(req.body);
  await resetPassword(request);
  return clearAuthCookies(res).status(OK).json({
    message: "Password reset successfull",
  });
});
