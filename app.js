const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");

const app = express();
mongoose.connect("mongodb://localhost:27017/mestodb");

const { PORT = 3000 } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: "64a2c24e4b5ebc15bc4491b2", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(bodyParser.json());

app.use("/users", userRouter);

app.use("/cards", cardRouter);

app.listen(PORT, () => {});
