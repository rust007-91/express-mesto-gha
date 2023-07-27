const Card = require('../models/card');
const statusCode = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');

// контроллер на запрос создания карточки
const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res
        .status(statusCode.CREATED)
        .send(card);
    })
    .catch(next);
};

// контроллер на возвращение всех карточек
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => new NotFoundError({ message: 'Карточка с указанным _id не найдена.' }))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new Forbidden({ message: 'Невозможно удалить чужую карточку' });
      } else {
        Card.deleteOne(cardId)
          .then(() => {
            res.send(card);
          });
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new NotFoundError({ message: 'Карточка с указанным _id не найдена.' }))
    .then((card) => {
      res.send({ card });
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => new NotFoundError({ message: 'Карточка с указанным _id не найдена.' }))
    .then((like) => {
      res.send(like);
    })
    .catch(next);
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
