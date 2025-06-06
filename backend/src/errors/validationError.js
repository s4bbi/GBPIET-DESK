const BaseError = require("./baseError");
const { StatusCodes } = require("http-status-codes");

class ValidationError extends BaseError {
  constructor(message = "Validation Failed", details = null) {
    super(
      "ValidationError",
      StatusCodes.UNPROCESSABLE_ENTITY,
      message,
      details
    );
  }
}

module.exports = ValidationError;
