module.exports = (res, error) => {
  res.status(500).json({
    success: false,
    message: error.message ? error.message : error, //если у ошибки есть поле message то обращаемся к ошибке и выводим ее поле message если данного поля не будет то будет выдавать саму ошибку
  });
};
