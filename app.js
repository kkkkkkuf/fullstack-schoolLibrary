const express = require(`express`);
const bodyParser = require(`body-parser`);
const mongoose = require(`mongoose`);
const passport = require(`passport`);
// пакет cors служит для того чтобы наш сервер мог обрабатывать
// cors запросы допустим у нас клиент будет находиться
// на другом домене то мы сможем все равно отвечать нашим сервером
// const cors = require(`cors`)
// пакет морган служит для того чтобы мы могли более красиво логировать определенные запросы
// т.е. смотреть что происходит с сервером в данный момент

const users = require(`./routes/user`);
const books = require(`./routes/book`);
const keys = require(`./config/keys`);
const issuedBooks = require(`./routes/issuedBook`);
const search = require(`./routes/search`);

const app = express();

mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("MongoDB connected."))
  .catch((error) => console.log(error));

app.use(passport.initialize());
require("./middleware/passport")(passport);

app.use(require(`morgan`)("dev"));
// app.use(`/uploads`, express.static(`uploads`));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require(`cors`)());

app.use("/api/users", users);
app.use("/api/books", books);
app.use("/api/issuedBooks", issuedBooks);
app.use("/api/search", search);

module.exports = app;
