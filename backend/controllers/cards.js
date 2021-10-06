/* eslint-disable consistent-return */
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request-err');
const Forbidden = require('../errors/forbidden-err');

const {
  NOT_FOUND_USER_MESSAGE,
  VALIDATION_ERROR,
  CAST_ERROR,
  INCORRECT_DATA_CREATING_CARD_MESSAGE,
  INCORRECT_DATA_LIKE_UNLIKE_MESSAGE,
  NOT_FOUND_CARD_MESSAGE,
  ERROR,
  FORBIDDEN_MESSAGE,
} = require('../utils/const');

module.exports.getCards = (req, res, next) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(next);

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequest(INCORRECT_DATA_CREATING_CARD_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  .orFail(new NotFoundError('Карточка с указанным _id не найдена.'))
  .then((card) => {
    if (JSON.stringify(req.user._id) === JSON.stringify(card.owner)) {
      return Card.findByIdAndRemove(req.params.cardId)
        .then((deleteCard) => res.send(deleteCard))
        .catch(next);
    }
    next(new Forbidden(FORBIDDEN_MESSAGE));
  })
  .catch((err) => {
    if (err.name === ERROR) {
      next(new NotFoundError(NOT_FOUND_CARD_MESSAGE));
    }
    if (err.name === CAST_ERROR) {
      next(new BadRequest(NOT_FOUND_CARD_MESSAGE));
    }
    next(err);
  });

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
).orFail(new NotFoundError(NOT_FOUND_USER_MESSAGE))
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === ERROR) {
      next(new NotFoundError(INCORRECT_DATA_LIKE_UNLIKE_MESSAGE));
    }
    if (err.name === CAST_ERROR) {
      next(new BadRequest(INCORRECT_DATA_LIKE_UNLIKE_MESSAGE));
    }
    next(err);
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
).orFail(new NotFoundError(NOT_FOUND_USER_MESSAGE))
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === ERROR) {
      next(new NotFoundError(INCORRECT_DATA_LIKE_UNLIKE_MESSAGE));
    }
    if (err.name === CAST_ERROR) {
      next(new BadRequest(INCORRECT_DATA_LIKE_UNLIKE_MESSAGE));
    }
    next(err);
  });
