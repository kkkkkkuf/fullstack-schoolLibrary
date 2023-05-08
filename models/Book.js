const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  genre: {
    type: String,
  },
  about: {
    type: String,
  },
  count: {
    type: Number,
  },
  image: {
    type: String,
  },
  forWhatClass: {
    type: String,
  },
});

// const books = module.exports = mongoose.model("books", bookSchema);

let books;
try {
  books = mongoose.model("books");
} catch (error) {
  books = mongoose.model("books", bookSchema);
}

module.exports = books;
