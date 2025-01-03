const z = require("zod");
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("../constants/http");
const { AppError } = require("../utils/appError");
const { REFRESH_PATH, clearAuthCookies } = require("../utils/cookies");

const handleZodError = (res, error) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
  return res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};

const handleAppError = (res, error) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

const errorHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}`, error);

  if (req.path === REFRESH_PATH) {
    console.log("clearing auth cookies");
    clearAuthCookies(res);
  }
  if (error instanceof z.ZodError) {
    handleZodError(res, error);
  } else if (error instanceof AppError) {
    handleAppError(res, error);
  } else {
    res.status(INTERNAL_SERVER_ERROR).send("Internal server error");
  }
  next();
};

exports.errorHandler = errorHandler;
