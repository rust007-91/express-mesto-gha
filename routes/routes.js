const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');

const { createUsers, login } = require('../contollers/users');
const { authValidate, loginValidate } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', createUsers, authValidate); // роут на регистрацию
router.post('/signin', login, loginValidate); // роут на аутентификацию

router.use(auth); // авторизация для запросов ниже

router.use('/users', userRouter);

router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(new NotFoundError({ message: 'Страница не существует' }));
});

module.exports = router;