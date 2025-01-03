const AppError = require("./appError"); // Corrected the import

/**
 * Asserts a condition and throws an AppError if the condition is falsy
 */
const appAssert = (condition, httpStatusCode, message, appErrorCode) => {
  if (!condition) {
    throw new AppError(httpStatusCode, message, appErrorCode); // Use the updated constructor
  }
};

exports.appAssert = appAssert;
