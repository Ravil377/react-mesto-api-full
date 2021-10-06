const validator = require('validator');
const BadRequest = require('../errors/bad-request-err');

module.exports.validateUrl = (url, next) => {
  const result = validator.isURL(url, { require_protocol: true });
  if (!result) {
    next(new BadRequest('Введена некоректная ссылка.'));
  }
  return url;
};
