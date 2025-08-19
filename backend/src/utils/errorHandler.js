const { StatusCodes } = require("http-status-codes");

function errorHandler(err, req, res, next) {
  console.error("❌ Error caught in errorHandler:", err); // Always log full error for debugging

  // ✅ Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));

    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Validation failed",
      code: "VALIDATION_ERROR",
      data: {},
      error:
        process.env.NODE_ENV === "development"
          ? {
              name: err.name,
              message: err.message,
              stack: err.stack,
              details: errors,
            }
          : undefined,
    });
  }

  // ✅ Handle Mongoose cast errors (bad ObjectId)
  if (err.name === "CastError") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}`,
      code: "INVALID_ID",
      data: {},
      error:
        process.env.NODE_ENV === "development"
          ? {
              name: err.name,
              message: err.message,
              stack: err.stack,
            }
          : undefined,
    });
  }

  // ✅ Handle custom operational errors (like BadRequestError)
  if (err.statusCode && err.code) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
      data: err.details || {},
      error:
        process.env.NODE_ENV === "development"
          ? {
              name: err.name,
              message: err.message,
              stack: err.stack,
              details: err.details || null,
            }
          : undefined,
    });
  }

  // ❌ Unknown / unhandled errors → generic response
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal Server Error",
    code: "INTERNAL_ERROR",
    data: {},
    error:
      process.env.NODE_ENV === "development"
        ? {
            name: err.name,
            message: err.message,
            stack: err.stack,
          }
        : undefined,
  });
}

module.exports = errorHandler;
