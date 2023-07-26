const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  // импортируем модуль jsonwebtoken
const User = require('../models/user');
const statusCode = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const Unauthorized = require('../errors/Unauthorized');

// контроллер на запрос создания пользователя
const createUsers = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  if (!email || !password) return res.status(400).send({ message: 'email или пароль не могут быть пустыми' });

  bcrypt.hash(String(password), 10) // хешируем пароль
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      res
        .status(statusCode.CREATED)
        .send(user);
    })
    .catch(next);
};

// контроллер на запрос возвращения пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => new NotFoundError({ message: 'Пользователь не найден' })) // формируем ошибку
    .then((users) => {
      res
        .status(statusCode.OK)
        .send(users);
    })
    .catch(next);
};

// контроллер на запрос возвращения конкретного пользователя
const getUserId = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => new NotFoundError({ message: 'Пользователь не найден' }))
    .then((user) => {
      res
        .status(statusCode.OK)
        .send(user);
    })
    .catch(next); // пробрасывает в мидлвару обработчика ошибок
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    },
  )
    .orFail(() => new BadRequestError({ message: 'Переданы некорректные данные' }))
    .then((user) => {
      res
        .status(statusCode.OK)
        .send(user);
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .orFail(() => new NotFoundError({ message: 'Пользователь не найден' }))
    .then((user) => {
      res
        .status(statusCode.OK)
        .send(user);
    })
    .catch(next);
};

// контроллер на запрос аутентификации
const login = (req, res, next) => {
  // отправляем почту и пароль
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ message: 'email или пароль не могут быть пустыми' });
  // если почта и пароль совпадают, пользователь входит, иначе получает ошибку
  // select('+password') отменяем правило исключения в модели
  User.findOne({ email })
    .select('+password')
    .orFail(() => new Unauthorized({ message: 'Неправильные почта или пароль' }))
    .then((user) => {
      // сравниваем переданный пароль и хеш из базы
      bcrypt.compare(String(password), user.password)
        .then(() => {
          // аутентификация успешна
          // создать JWT
          const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }); // токен будет просрочен через 7 дней
          // прикрепить его к куке
          res.cookie('jwt', token, {
            maxAge: 604800, // время действия токена
            httpOnly: true, // cookie доступны в рамках запроса http
            sameSite: true, // позволяет отправлять куки только в рамках одного домена
          });
          res.send(user.toJSON());
        })
        .catch(next);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError({ message: 'Пользователь не найден' }))
    .then((user) => {
      res
        .status(statusCode.OK)
        .send(user);
    })
    .catch(next);
};

module.exports = {
  createUsers,
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
  login,
  getUser,
};
