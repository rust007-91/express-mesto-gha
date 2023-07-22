const statusCode = require('../utils/constants');

class Unauthorized extends Error {
  constructor(err) {
    super(err);
    this.message = err.message;
    this.statusCode = statusCode.UNAUTHORIZED;
  }
}

module.exports = Unauthorized;