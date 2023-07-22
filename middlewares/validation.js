const { celebrate, Joi } = require('celebrate');

const regexAvatar = /(https?:\/\/)(w{3}\.)?([a-zA-Z0-9\S]{1,})#?/;

const loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
});

const userUpdateValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const avatarUpdateValid = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regexAvatar),
  }),
});

module.exports = {
  loginValid,
  userUpdateValid,
  avatarUpdateValid,
};