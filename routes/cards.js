const router = require("express").Router();

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../contollers/cards");

router.post("/", createCard); // роут на создание карточки

router.get("/", getCards); // роут на возвращение всех карточек

router.delete("/:cardId", deleteCard);

router.put("/:cardId/likes", likeCard);

router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
