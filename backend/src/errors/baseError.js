class BaseError extends Error {
  constructor(name, statusCode, description, details = null) {
    super(description);

    this.name = name;
    this.statusCode = statusCode;
    this.details = details;

    // Maintain proper stack trace (only in V8 environments like Node.js)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = BaseError;
