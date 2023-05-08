const Book = require("../models/Book");
const IssuedBook = require(`../models/IssuedBook`);
const errorHandler = require(`../utils/errorHandler`);

module.exports.create = async function (req, res) {
  try {
    const book = await new Book({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      about: req.body.about,
      count: req.body.count,
      image: req.body.image,
    }).save();
    res.json({
      success: true,
      message: "Книга добавлена.",
      book,
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getAllBook = async function (req, res) {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getByBookId = async function (req, res) {
  try {
    await Book.findById(req.params.id).then((book) => {
      res.send(book);
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async function (req, res) {
  (id = req.body._id),
    (title = req.body.title),
    (author = req.body.author),
    (genre = req.body.genre),
    (about = req.body.about),
    (image = req.body.image),
    (count = req.body.count),
    (forWhatClass = req.body.forWhatClass);
  Book.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        title: title,
        author: author,
        genre: genre,
        about: about,
        image: image,
        count: count,
        forWhatClass: forWhatClass,
      },
    }
  ).then((book, err) => {
    if (err) {
      res.json({ success: false, msg: "Не удалось обновить данные по книге" });
    } else {
      res.json({ success: true, msg: "Данные по книге обновлены" });
    }
  });
};

module.exports.remove = async function (req, res) {
  try {
    // Проверяем наличие запросов на эту книгу
    const issuedBooks = await IssuedBook.find({
      bookId: req.params.id,
      issued: false,
    }).exec();
    if (issuedBooks.length > 0) {
      res.json({
        success: false,
        msg: "Книга не может быть удалена, так как на нее есть запросы на выдачу. Сначала отклоните запрос",
      });
      return;
    }

    await Book.remove({ _id: req.params.id });
    res.json({ success: true, msg: "Книга удалена." });
  } catch (e) {
    errorHandler(res, e);
  }
};
