const BaseError = require("./baseError");
const { StatusCodes } = require("http-status-codes");

class UnauthorizedError extends BaseError {
  constructor(message = "Unauthorized", details = null) {
    super("UnauthorizedError", StatusCodes.UNAUTHORIZED, message, details);
  }
}

module.exports = UnauthorizedError;
