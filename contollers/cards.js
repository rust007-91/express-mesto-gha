const Card = require('../models/card');
const statusCode = require('../utils/constants');

// контроллер на запрос создания карточки
const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (card) {
        res.status(statusCode.CREATED).send({ message: 'сервер успешно обработал запрос и создал новый ресурс' });
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(statusCode.BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные', name: err.name });
      } else {
        res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

// контроллер на возвращение всех карточек
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        res
          .status(statusCode.NOT_FOUND)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.send(cards);
      }
    })
    .catch(() => {
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send({ message: 'Внутренняя ошибка сервера' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res
          .status(statusCode.NOT_FOUND)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(statusCode.BAD_REQUEST)
          .send({ message: 'Неверный запрос', name: err.name });
      } else {
        res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(statusCode.NOT_FOUND)
          .send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.send({ card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(statusCode.BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные', name: err.name });
      } else {
        res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((like) => {
      if (!like) {
        res
          .status(statusCode.NOT_FOUND)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.send(like);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(statusCode.BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные', name: err.name });
      } else {
        res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
