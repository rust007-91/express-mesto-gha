const router = require('express').Router();

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../contollers/cards');

const {
  createCardValidate,
  idValidate,
} = require('../middlewares/validation');

router.post('/', createCard, createCardValidate); // роут на создание карточки

router.get('/', getCards); // роут на возвращение всех карточек

router.delete('/:cardId', deleteCard, idValidate);

router.put('/:cardId/likes', likeCard, idValidate);

router.delete('/:cardId/likes', dislikeCard, idValidate);

module.exports = router;
