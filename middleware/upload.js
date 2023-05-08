// const multer = require(`multer`);
// const moment = require(`moment`);

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "assets/images/");
//   },
//   filename(req, file, cb) {
//     const date = moment().format("DDMMYYYY-HHmmss_SSS");
//     cb(null, `${date}-${file.originalname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const limits = {
//   fileSize: 1024 * 1024 * 5,
// };

// module.exports = multer({
//   storage,
//   fileFilter,
//   limits,
// });

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../assets/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
});

module.exports = upload;
