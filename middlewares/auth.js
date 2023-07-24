const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    next(new Unauthorized({ message: 'Необходима авторизация' }));
  }
  req.user = payload;

  next();
};

module.exports = auth;