const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено'],
      unique: true, // правило отклоняющее создание одинаковых пользователей
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Неправильные данные',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле "password" должно быть заполнено'],
      select: false,
    },
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Некорректный URL',
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
  },
  { versionKey: false },
);

// метод скрытия пороля в возвращаемом объекте
userSchema.methods.toJSON = function() {
  const user = this.toObject(); // приведение к объекту
  delete user.password;

  return user;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
