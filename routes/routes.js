const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regexAvatar = /https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/;

const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');

const { createUsers, login } = require('../contollers/users');
const { loginValidate } = require('../middlewares/validation');

router.post('/signup', createUsers, celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexAvatar),
  }),
})); // роут на регистрацию
router.post('/signin', login, loginValidate); // роут на аутентификацию

router.use(auth); // авторизация для запросов ниже

router.use('/users', userRouter);

router.use('/cards', cardRouter);

module.exports = router;