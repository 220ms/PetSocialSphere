const appAssert = require("../utils/appAssert");
const { UNAUTHORIZED } = require("../constants/http");
const AppErrorCode = require("../constants/appErrorCode");
const { verifyToken } = require("../utils/jwt");
const mongoose = require("mongoose");

const authenticate = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Not Authorized",
    AppErrorCode.InvalidAccessToken
  );

  const { error, payload } = verifyToken(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    AppErrorCode.InvalidAccessToken
  );

  const { userId, sessionId } = payload;
  req.userId = userId;
  req.sessionId = sessionId;
  next();
};

exports.authenticate = authenticate;
