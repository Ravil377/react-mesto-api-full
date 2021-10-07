/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request-err');
const InternalServerError = require('../errors/internal-server-err');
const UserIsRegistered = require('../errors/user-is-registered-err');
const AuthError = require('../errors/auth-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  VALIDATION_ERROR,
  CAST_ERROR,
  NOT_FOUND_USER_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  INVALID_DATA_CREATING_USER_MESSAGE,
  INCORRECT_DATA_UPDATING_AVATAR_MESSAGE,
  INCORRECT_DATA_UPDATING_PROFILE_MESSAGE,
  NOT_FOUND_LOGIN_MESSAGE,
  SALT_ROUNDS,
  UNAUTHORISED_ERROR_MESSAGE,
} = require('../utils/const');

module.exports.getUsers = (req, res, next) => User.find({})
  .then((users) => res.send(users))
  .catch(next);

module.exports.getUsersMe = (req, res, next) => User.findById(req.user._id)
  .orFail(new NotFoundError(NOT_FOUND_USER_MESSAGE))
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === CAST_ERROR) {
      next(new NotFoundError(NOT_FOUND_USER_MESSAGE));
    } else {
      next(err);
    }
  });

module.exports.getUser = (req, res, next) => User.findById(req.params.userId)
  .orFail(new NotFoundError(NOT_FOUND_USER_MESSAGE))
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === CAST_ERROR) {
      next(new NotFoundError(NOT_FOUND_USER_MESSAGE));
    } else {
      next(err);
    }
  });

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, SALT_ROUNDS, (error, hash) => {
    if (error) {
      next(new InternalServerError(DEFAULT_ERROR_MESSAGE));
    }
    return User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          next(new UserIsRegistered('Такой пользователь уже зарегистрирован'));
        }
        if (err.name === VALIDATION_ERROR) {
          next(new BadRequest(INVALID_DATA_CREATING_USER_MESSAGE));
        } else {
          next(err);
        }
      });
  });
};

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  if (!email || !password) {
    return next(new BadRequest(NOT_FOUND_LOGIN_MESSAGE));
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret', { expiresIn: '7d' });
      res
        .status(200)
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ message: 'Пользователь залогинен' });
    })
    .catch(() => next(new AuthError(UNAUTHORISED_ERROR_MESSAGE)));
};

module.exports.logout = (req, res) => {
  res
    .status(200)
    .cookie('jwt', 'token', {
      maxAge: -1,
      httpOnly: true,
    })
    .send({ message: 'Пользователь разлогинен' });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequest(INCORRECT_DATA_UPDATING_PROFILE_MESSAGE));
      }
      if (err.name === CAST_ERROR) {
        next(new NotFoundError(NOT_FOUND_USER_MESSAGE));
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequest(INCORRECT_DATA_UPDATING_AVATAR_MESSAGE));
      }
      if (err.name === CAST_ERROR) {
        next(new NotFoundError(NOT_FOUND_USER_MESSAGE));
      }
      next(err);
    });
};
