const statusCode = {
  BAD_REQUEST: 400, //неправильный, некорректный запрос
  NOT_FOUND: 404, //не найдено
  INTERNAL_SERVER_ERROR: 500, //внутренняя ошибка сервера
  CREATED: 201, //создано
  UNAUTHORIZED: 401, // не авторизован
  FORBIDDEN: 403, //запрещено
};

module.exports = statusCode;
