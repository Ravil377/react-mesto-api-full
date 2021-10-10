/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  settingMongoose,
  mongoDbLink,
} = require('./utils/const');

mongoose.connect(mongoDbLink, settingMongoose);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(cors({
  origin: [
    'https://ravil377.nomoredomains.monster',
    'https://ravil377-front.nomoredomains.monster',
    'https://localhost:3000',
    'https://localhost:3001',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    password: Joi.string().min(8).required(),
    email: Joi.string().required().email(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(http|https):\/\/(www.)?[\w\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+\.[\w\/]+#?/),
  }),
}), createUser);

app.post('/logout', logout);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Запустился!');
});
