require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet'); // защита от вэб уязвимостей
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const errorHandler = require('./middlewares/error');
const { errors } = require('celebrate');


const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();
mongoose.connect(DB_URL);

app.use(helmet()); // защита от вэб уязвимостей

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/users', userRouter);

app.use('/cards', cardRouter);

app.use(errors());
app.use(errorHandler); // мидлвара ошибок

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
