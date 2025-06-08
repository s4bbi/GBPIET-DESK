class BadRequestError extends Error {
  constructor(message, description) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
    this.description = description || null;
  }
}

class NotFoundError extends Error {
  constructor(message, description) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
    this.description = description || null;
  }
}

class UnauthorizedError extends Error {
  constructor(message, description) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
    this.description = description || null;
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
};
