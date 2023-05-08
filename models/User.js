const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fio: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "учащийся",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "assets/images/userImage.png",
  },
  classA: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", userSchema);
