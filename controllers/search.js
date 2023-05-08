const Book = require("../models/Book");

module.exports.search = function (req, res) {
  const query = req.body.query; // Получаем объект запроса
  const searchString = typeof query === "string" ? query : query.query; // Достаем строку запроса

  Book.find({
    $or: [
      { title: { $regex: searchString } },
      { author: { $regex: searchString } },
      { forWhatClass: { $regex: searchString } },
      { genre: { $regex: searchString } },
    ],
  }).then((item) => {
    res.send(item);
  });
};
