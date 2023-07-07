const router = require('express').Router();

const {
  createUsers,
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
} = require('../contollers/users');

router.post('/', createUsers); // роут на создание пользователя

router.get('/', getUsers); // роут на возвращение всех пользователей

router.get('/:userId', getUserId); // роут на возвращение конкретного пользователя

router.patch('/me', updateUser); // роут на обновление профиля

router.patch('/me/avatar', updateAvatar);

module.exports = router;
