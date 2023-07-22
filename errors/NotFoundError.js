const statusCode = require('../utils/constants');

class NotFoundError extends Error {
  constructor(err) {
    super(err);
    this.message = err.message;
    this.statusCode = statusCode.NOT_FOUND;
  }
}

module.exports = NotFoundError;