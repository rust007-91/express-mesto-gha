const statusCode = require('../utils/constants');

class ConflictServerError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Пользователь с таким email уже зарегистрирован';
    this.statusCode = statusCode.UNAUTHORIZED;
  }
}

module.exports = ConflictServerError;