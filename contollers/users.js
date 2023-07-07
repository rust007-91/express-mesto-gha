const User = require('../models/user');
const error = require('../utils/constants');

// контроллер на запрос создания пользователя
const createUsers = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(error.BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные', name: err.name });
      } else {
        res
          .status(error.INTERNAL_SERVER_ERROR)
          .send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

// контроллер на запрос возвращения пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users) {
        res.status(error.NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.send(users);
      }
    })
    .catch(() => {
      res
        .status(error.INTERNAL_SERVER_ERROR)
        .send({ message: 'Внутренняя ошибка сервера' });
    });
};

// контроллер на запрос возвращения конкретного пользователя
const getUserId = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(error.NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(error.BAD_REQUEST)
          .send({ message: 'Неверный запрос', name: err.name });
      } else {
        res
          .status(error.INTERNAL_SERVER_ERROR)
          .send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

const updateUser = (req, res) => {
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
    .then((user) => {
      if (!user) {
        res.status(error.NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(error.BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные', name: err.name });
      } else {
        res
          .status(error.INTERNAL_SERVER_ERROR)
          .send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } =
    req.body; /* eslint no-shadow: ["error", { "allow": ["state"] }]*/
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    },
  )
    .then((avatar) => {
      if (!avatar) {
        res.status(error.NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.send(avatar);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(error.BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные', name: err.name });
      } else {
        res
          .status(error.INTERNAL_SERVER_ERROR)
          .send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports = {
  createUsers,
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
};
