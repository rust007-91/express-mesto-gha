const statusCode = require('../utils/constants');

class InternalServerError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Внутренняя ошибка сервера';
    this.statusCode = statusCode.INTERNAL_SERVER_ERROR;
  }
}

module.exports = InternalServerError;