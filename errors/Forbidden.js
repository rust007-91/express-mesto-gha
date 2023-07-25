const statusCode = require('../utils/constants');

class Forbidden extends Error {
  constructor(err) {
    super(err);
    this.message = err.message;
    this.statusCode = statusCode.FORBIDDEN;

  }
}

module.exports = Forbidden;