const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const issuedBookSchema = new Schema({
  bookId: {
    type: String,
  },
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  image: {
    type: String,
  },
  memberFIO: {
    type: String,
  },
  memberEmail: {
    type: String,
  },
  dueDate: {
    type: String,
  },
  remarks: {
    type: String,
  },
  issued: {
    type: Boolean,
  },
  returned: {
    type: Boolean,
  },
  isExtended: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("issuedBooks", issuedBookSchema);

module.exports.addBook = (newIssuedBook, callback) => {
  newIssuedBook.save(callback);
};
