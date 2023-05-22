const IssuedBook = require(`../models/IssuedBook`);
const Book = require(`../models/Book`);
const errorHandler = require(`../utils/errorHandler`);

//Посмотреть все книги
module.exports.getAllBookRead = async function (req, res) {
  try {
    const issuedBooks = await IssuedBook.find();
    res.status(200).json(issuedBooks);
  } catch (e) {
    errorHandler(res, e);
  }
};

//для читателей

module.exports.takebook = function (req, res) {
  const bookId = req.body.bookId;
  const memberEmail = req.body.memberEmail;

  // Проверяем, есть ли уже запись с таким bookId и memberEmail
  IssuedBook.findOne(
    {
      bookId: bookId,
      memberEmail: memberEmail,
      issued: false,
      returned: false,
    },
    function (err, book) {
      if (err) {
        res.json({ success: false, msg: "Не удалось взять книгу" });
      } else if (book) {
        res.json({ success: false, msg: "Вы уже запросили эту книгу" });
      } else {
        const issuedBook = new IssuedBook({
          bookId: bookId,
          title: req.body.title,
          author: req.body.author,
          image: req.body.image,
          memberFIO: req.body.memberFIO,
          memberEmail: memberEmail,
          returned: false,
          issued: false,
        });

        // Проверка на то, чтобы у пользователя на руках было не более 10 книг
        const memberFIO = issuedBook.memberFIO;
        IssuedBook.find({
          memberFIO: memberFIO,
          issued: true,
          returned: false,
        }).then((issuedBooks) => {
          // Проверяем, есть ли уже выданная книга у пользователя
          if (issuedBooks.some((book) => book.bookId === bookId)) {
            res.json({
              success: false,
              msg: "Вы уже взяли эту книгу",
            });
          } else if (issuedBooks.length >= 10) {
            res.json({
              success: false,
              msg: "Вы взяли максимальное количество книг. Свяжитесь с вашим библиотекарем",
            });
          } else {
            // Обновляем количество доступных книг в библиотеке
            Book.findByIdAndUpdate(
              bookId,
              { $inc: { count: -1 } },
              function (err, book) {
                if (err) {
                  res.json({
                    success: false,
                    msg: "Не удалось взять книгу",
                  });
                } else {
                  // Добавляем книгу в выданные
                  issuedBook.save(function (err) {
                    if (err) {
                      res.json({
                        success: false,
                        msg: "Не удалось взять книгу",
                      });
                    } else {
                      res.json({
                        success: true,
                        msg: "Книга успешно взята",
                      });
                    }
                  });
                }
              }
            );
          }
        });
      }
    }
  );
};

// Пользователь только отправил запрос на взятие книги
module.exports.getSubmittedBooks = async function (req, res) {
  try {
    const memberEmail = req.params.email;
    await IssuedBook.find({
      memberEmail: memberEmail,
      issued: false,
      returned: false,
    }).then((books) => {
      res.send(books);
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

//Просмотр книг, выданные пользователю
module.exports.getIssuedBooks = async function (req, res) {
  try {
    const memberEmail = req.params.email;
    await IssuedBook.find({
      memberEmail: memberEmail,
      issued: true,
      returned: false,
    }).then((books) => {
      res.send(books);
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

//для библиотекарей

//Выдача книги Библиотекарем
module.exports.putIssueBook = async function (req, res) {
  try {
    id = req.body._id;
    title = req.body.title;
    (memberEmail = req.body.memberEmail),
      (dueDate = req.body.dueDate),
      (issued = true),
      (remarks = req.body.remarks),
      await IssuedBook.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            dueDate: dueDate,
            issued: issued,
            remarks: remarks,
          },
        }
      ).then(() => {
        res.send();
      });
  } catch (e) {
    errorHandler(res, e);
  }
};

//Читатель отправил запрос на взятие книги и это лист для всех этиз запросов
module.exports.getWaitingReturned = async function (req, res) {
  await IssuedBook.find({ issued: true }, { returned: false }).then((books) => {
    res.send(books);
  });
};

module.exports.getWaitingReturnedByEmail = async function (req, res) {
  const userId = req.params._id;
  const memberEmail = req.body.memberEmail;

  await IssuedBook.find({
    issued: true,
    memberEmail: memberEmail,
    user: userId,
  }).then((books) => {
    res.send(books);
  });
};

module.exports.getWaitingIssued = async function (req, res) {
  await IssuedBook.find({ issued: false }, { returned: false }).then(
    (books) => {
      res.send(books);
    }
  );
};

//Книги, ожидающие выдачи
module.exports.getIssued = async function (req, res) {
  await IssuedBook.find({ issued: false }).then((books) => {
    res.send(books);
  });
};

//Удаление возвращенных книг из БД Issuedbooks

// module.exports.deleteById = async function (req, res) {
//   id = req.params.id;
//   await IssuedBook.findByIdAndDelete({ _id: id }).then(() => {
//     res.send();
//   });
// };

module.exports.deleteById = async function (req, res) {
  const id = req.params.id;

  // Находим книгу по id
  const issuedBook = await IssuedBook.findById(id);

  if (!issuedBook) {
    return res.status(404).json({ success: false, msg: "Книга не найдена" });
  }

  // Увеличиваем значение поля count в Books
  const bookId = issuedBook.bookId;
  await Book.findOneAndUpdate({ _id: bookId }, { $inc: { count: 1 } });

  // Удаляем запись о выдаче книги из IssuedBook
  await IssuedBook.findByIdAndDelete({ _id: id }).then(() => {
    res.send();
  });
};

// Количество дней, на которое продлевается срок выдачи книги
const EXTEND_DAYS = 14;

// Продление сроков выдачи книги пользователем
module.exports.extendBook = async function (req, res) {
  try {
    const id = req.body.id;

    // Проверяем, есть ли такая выданная книга в базе данных
    const issuedBook = await IssuedBook.findById(id);
    if (!issuedBook) {
      return res.status(404).json({
        success: false,
        msg: "Книга не найдена",
      });
    }

    // Проверяем, что книга была выдана пользователю, который отправил запрос
    if (issuedBook.memberEmail !== req.user.email) {
      return res.status(403).json({
        success: false,
        msg: "Доступ запрещен",
      });
    }

    // Проверяем, что пользователь не продлевал книгу ранее
    if (issuedBook.isExtended) {
      return res.status(400).json({
        success: false,
        msg: "Нельзя продлить книгу более одного раза",
      });
    }

    // Рассчитываем новую дату возврата книги
    const dueDate = new Date(issuedBook.dueDate);
    const newDueDate = new Date(
      dueDate.getTime() + EXTEND_DAYS * 24 * 60 * 60 * 1000
    );

    // Обновляем дату возврата книги в базе данных
    issuedBook.dueDate = newDueDate.toISOString().slice(0, 10);
    issuedBook.isExtended = true;
    await issuedBook.save();

    // Отправляем сообщение о том, что продление срока выдачи книги прошло успешно
    res.status(200).json({
      success: true,
      msg: "Срок выдачи книги успешно продлен",
    });
  } catch (e) {
    errorHandler(res, e);
  }
};
