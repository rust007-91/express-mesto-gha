const router = require('express').Router();

const {
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
  getUser,
} = require('../contollers/users');

const {
  idValidate,
  userUpdateValidate,
  avatarUpdateValidate,
} = require('../middlewares/validation');

router.get('/', getUsers); // роут на возвращение всех пользователей

router.get('/me', getUser); // роут на возвращение информацию о текущем пользователе

router.get('/:userId', getUserId, idValidate); // роут на возвращение конкретного пользователя

router.patch('/me', updateUser, userUpdateValidate); // роут на обновление профиля

router.patch('/me/avatar', updateAvatar, avatarUpdateValidate);

module.exports = router;
