const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

const { JWT_SECRET = 'secret' } = process.env;

const {
  UNAUTHORISED_MESSAGE,
} = require('../utils/const');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new AuthError(UNAUTHORISED_MESSAGE);
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(err);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
