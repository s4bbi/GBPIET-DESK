const { StatusCodes } = require("http-status-codes");
// const BaseError = require("../errors/baseError");
const BaseError = require("../errors/baseError");

function errorHandler(err, req, res, next) {
  const isOperational = err instanceof BaseError;

  const statusCode = isOperational
    ? err.statusCode
    : StatusCodes.INTERNAL_SERVER_ERROR;
  const message = isOperational ? err.message : "Internal Server Error";
  const errorDetails = isOperational
    ? err.details || null
    : {
        name: err.name,
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      };

  res.status(statusCode).json({
    success: false,
    message,
    error: errorDetails,
    data: {},
  });
}

module.exports = errorHandler;
