const { celebrate, Joi } = require('celebrate');

const regexAvatar = /https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/;

const authValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexAvatar),
  }),
});

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const idValidate = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24),
  }),
});

const userUpdateValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const avatarUpdateValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regexAvatar),
  }),
});

const createCardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(regexAvatar).required(),
  }),
});

module.exports = {
  authValidate,
  loginValidate,
  idValidate,
  userUpdateValidate,
  avatarUpdateValidate,
  createCardValidate,
};