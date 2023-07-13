const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const error = require('./utils/constants');
const helmet = require('helmet'); // защита от вэб уязвимостей

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();
mongoose.connect(DB_URL);

app.use((req, res, next) => {
  req.user = {
    _id: '64a2c24e4b5ebc15bc4491b2', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(helmet()); // защита от вэб уязвимостей

app.use(bodyParser.json());

app.use('/users', userRouter);

app.use('/cards', cardRouter);

app.use((req, res) => {
  res.status(error.NOT_FOUND).send({ message: 'Страница не существует' });
});

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
