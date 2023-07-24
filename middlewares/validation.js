const { celebrate, Joi, Segments } = require('celebrate');

const regexAvatar = /(https?:\/\/)(w{3}\.)?([a-zA-Z0-9\S]{1,})#?/;

const authValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().pattern(regexAvatar),
  }),
});

const loginValidate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
});

const idValidate = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().length(24),
  }),
});

const userUpdateValidate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const avatarUpdateValidate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().pattern(regexAvatar),
  }),
});

module.exports = {
  authValidate,
  loginValidate,
  idValidate,
  userUpdateValidate,
  avatarUpdateValidate,
};