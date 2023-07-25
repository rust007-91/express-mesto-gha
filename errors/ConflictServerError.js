class ConflictServerError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Пользователь с таким email уже зарегистрирован';
    this.statusCode = 409;
  }
}

module.exports = ConflictServerError;