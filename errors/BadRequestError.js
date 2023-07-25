const statusCode = require('../utils/constants');

class BadRequestError extends Error {
  constructor(err) {
    super(err);
    this.message = err.message;
    this.statusCode = statusCode.BAD_REQUEST;

  }
}

module.exports = BadRequestError;