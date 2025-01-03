class AppError extends Error {
  constructor(statusCode, message, errorCode) {
    super(message); // Call the parent constructor (Error)
    this.statusCode = statusCode; // Initialize the statusCode
    this.errorCode = errorCode; // Initialize the errorCode
    this.isOperational = true; // Add this for better error handling (optional)
    Error.captureStackTrace(this, this.constructor); // Preserve the stack trace
  }
}

module.exports = AppError;
