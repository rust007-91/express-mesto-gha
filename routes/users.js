const router = require('express').Router();

const {
  createUsers,
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
  login,
  getUser,
} = require('../contollers/users');

const auth = require('../middlewares/auth');

const {
  authValidate,
  loginValidate,
  idValidate,
  userUpdateValidate,
  avatarUpdateValidate,
} = require('../middlewares/validation');

router.post('/signup', createUsers, authValidate); // роут на регистрацию
router.post('/signin', login, loginValidate); // роут на аутентификацию

router.use(auth); // авторизация для запросов ниже

router.get('/users', getUsers); // роут на возвращение всех пользователей

router.get('users/me', getUser); // роут на возвращение информацию о текущем пользователе

router.get('users/:userId', getUserId, idValidate); // роут на возвращение конкретного пользователя

router.patch('users/me', updateUser, userUpdateValidate); // роут на обновление профиля

router.patch('users/me/avatar', updateAvatar, avatarUpdateValidate);

module.exports = router;
