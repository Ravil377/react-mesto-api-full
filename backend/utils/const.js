module.exports.mongoDbLink = 'mongodb://localhost:27017/mestodb';
module.exports.settingMongoose = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
module.exports.SALT_ROUNDS = 10;
module.exports.UNAUTHORISED = 401;
module.exports.DOUBLE_ADMIN = 409;
module.exports.BAD_REQUEST_ERROR_CODE = 400;
module.exports.NOT_FOUND_ERROR_CODE = 404;
module.exports.FORBIDDEN_ERROR_CODE = 403;
module.exports.INTERNAL_SERVER_ERROR_CODE = 500;
module.exports.VALIDATION_ERROR = 'ValidationError';
module.exports.CAST_ERROR = 'CastError';
module.exports.TYPE_ERROR = 'TypeError';
module.exports.ERROR = 'Error';
module.exports.NOT_FOUND_USER_MESSAGE = 'Пользователь по указанному _id не найден.';
module.exports.NOT_FOUND_LOGIN_MESSAGE = 'Не указан email или пароль';
module.exports.DOUBLE_ERROR_MESSAGE = 'Такой пользователь не зарегистрирован';
module.exports.FORBIDDEN_MESSAGE = 'Вы не можете удалить чужую карту';
module.exports.DEFAULT_ERROR_MESSAGE = 'На сервере произошла ошибка';
module.exports.UNAUTHORISED_ERROR_MESSAGE = 'Передан неверный логин или пароль';
module.exports.UNAUTHORISED_MESSAGE = 'Необходима авторизация';
module.exports.INVALID_DATA_CREATING_USER_MESSAGE = 'Переданы некорректные данные при создании пользователя.';
module.exports.INCORRECT_DATA_UPDATING_PROFILE_MESSAGE = 'Переданы некорректные данные при обновлении профиля.';
module.exports.INCORRECT_DATA_UPDATING_AVATAR_MESSAGE = 'Переданы некорректные данные при обновлении аватара.';
module.exports.INCORRECT_DATA_CREATING_CARD_MESSAGE = 'Переданы некорректные данные при создании карточки.';
module.exports.NOT_FOUND_CARD_MESSAGE = 'Карточка с указанным _id не найдена.';
module.exports.INCORRECT_DATA_LIKE_UNLIKE_MESSAGE = 'Переданы некорректные данные для постановки/снятии лайка.';
