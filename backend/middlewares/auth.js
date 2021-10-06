const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

const {
  UNAUTHORISED_MESSAGE,
  JWT_SECRET,
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
