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
  loginValid,
  userUpdateValid,
  avatarUpdateValid,
} = require('../middlewares/validation');

router.post('/signup', createUsers); // роут на регистрацию
router.post('/signin', loginValid, login); // роут на аутентификацию

router.use(auth); // авторизация для запросов ниже

router.get('/', getUsers); // роут на возвращение всех пользователей

router.get('/me', getUser); // роут на возвращение информацию о текущем пользователе

router.get('/:userId', getUserId); // роут на возвращение конкретного пользователя

router.patch('/me', userUpdateValid, updateUser); // роут на обновление профиля

router.patch('/me/avatar', avatarUpdateValid, updateAvatar);

module.exports = router;
