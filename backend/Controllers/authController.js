const jwt = require("jsonwebtoken");
const User = require("../Models/usersModel.js");
const bcrypt = require("bcrypt");

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

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    fname: req.body.fname,
    sname: req.body.sname,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, req, res);
};
