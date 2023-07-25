const statusCode = require('../utils/constants');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const Unauthorized = require('../errors/Unauthorized');
const ConflictServerError = require('../errors/ConflictServerError');
const InternalServerError = require('../errors/InternalServerError');

const errorHandler = (err, req, res, next) => {
  let error;
  console.log(err);
  console.log(err.name);

  if (err.name === 'CastError' || err.name === 'ValidationError' || err.statusCode === statusCode.BAD_REQUEST) {
    error = new BadRequestError(err);
  } else if (err.statusCode === statusCode.UNAUTHORIZED) {
    error = new Unauthorized(err);
  } else if (err.statusCode === statusCode.NOT_FOUND) {
    error = new NotFoundError(err);
  } else if (err.code === 11000) {
    error = new ConflictServerError(err);
  } else {
    error = new InternalServerError(err);
  }

  res.status(error.statusCode).send({ message: error.message });

  next();
};

module.exports = errorHandler;