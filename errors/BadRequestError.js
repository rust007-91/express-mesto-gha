const statusCode = require('../utils/constants');

class BadRequestError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Переданы некорректные данные';
    this.statusCode = statusCode.BAD_REQUEST;

  }
}

module.exports = BadRequestError;