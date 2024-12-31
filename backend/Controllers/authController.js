const jwt = require("jsonwebtoken");
const User = require("../Models/usersModel.js");
const AppError = require("../utils/appError.js");
const catchAsync = require("../utils/catchAsync.js");
const dotenv = require("dotenv").config();

const signToken = (id) => {
  console.log(typeof process.env.JWT_EXPIRES_IN);
  console.log(process.env.JWT_EXPIRES_IN);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieExpiresIn =
    parseInt(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000;
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + cookieExpiresIn),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;
  user.token = token;

  res.status(statusCode).json({
    status: "success",
    token: token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  console.log("Received request for signup");
  const newUser = await User.create({
    fname: req.body.fname,
    sname: req.body.sname,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  console.log("User created successfully");
  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything is ok, send token to client
  createSendToken(user, 200, req, res);
});
