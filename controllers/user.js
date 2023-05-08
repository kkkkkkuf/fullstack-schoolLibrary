const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);
const keys = require("../config/keys");
const errorHandler = require(`../utils/errorHandler`);
const User = require(`../models/User`);
const nodemailer = require("nodemailer");

module.exports.login = async function (req, res) {
  const canditate = await User.findOne({
    email: req.body.email,
  });

  if (canditate) {
    // Проверка пароля, пользователь существует
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      canditate.password
    );
    if (passwordResult) {
      // Мы генерируем токен, пароли совпали
      const token = jwt.sign(
        {
          email: canditate.email,
          userId: canditate._id,
        },
        keys.jwt,
        { expiresIn: 60 * 60 }
      );

      res.status(200).json({
        success: true,
        token: `Bearer ${token}`,
        user: {
          id: canditate._id,
          fio: canditate.fio,
          email: canditate.email,
          role: canditate.role,
        },
      });
    } else {
      return res.json({
        success: false,
        message: "Пароли не совпадают. Попробуйте снова.",
      });
    }
  } else {
    // Пользователя нет, ошибка
    return res.json({
      success: false,
      message: "Пользователь с таким email не найден",
    });
  }
};

module.exports.register = async function (req, res) {
  const canditate = await User.findOne({ email: req.body.email });

  if (canditate) {
    //Пользователь существует, нужно отправить ошибку
    res.json({
      success: false,
      message: "Такой email уже занят. Попробуйте другой.",
    });
  } else {
    //Нужно создать пользователя
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      fio: req.body.fio,
      classA: req.body.classA,
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    });

    try {
      await user.save();

      // https://ethereal.email/
      // Отправляем письмо на почту пользователя
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "will80@ethereal.email",
          pass: "Vv2FZ3yFBQzW2mdWMn",
        },
      });

      const mailOptions = {
        from: "mashukova112@gmail.com",
        to: req.body.email,
        subject: "Регистрация в школьной библиотеке прошла успешно!",
        text: `
        Добрый день, ${user.fio}. \n\ \n\
        
        Мы рады сообщить, что Вы успешно зарегистрировались в школьной библиотеке! \n\ \n\

        Ваша учетная запись была создана, и Вы можете начать пользоваться нашей библиотекой уже сейчас. \n\ \n\

        Спасибо за регистрацию в нашей библиотеке! \n\ \n\

        С уважением, \n\
        Команда школьной библиотеки`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Ошибка отправки письма:", error);
        } else {
          console.log("Письмо отправлено:", info.response);
        }
      });

      res.json({
        success: true,
        message:
          "Пользователь зарегистрирован. Вы можете войти в систему сейчас.",
      });
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

// //администратор назначает пользователя библиотекарем, доступ к привелегиям
// module.exports.updaterole = async function (req, res) {
//   const id = req.body._id;
//   const role = "Работник";
//   const candidate = await User.findByIdAndUpdate(
//     { _id: id },
//     { $set: { role: role } }
//   );
//   if (candidate) {
//     res.json({ message: "Подтверждена учетная запись библиотекаря" });
//   }
// };

// module.exports.getAll = async function (req, res) {
//   try {
//     const users = await User.find({ _id: { $ne: "63bcf7e5d53c2735b53198c5" } });
//     res.json(users);
//   } catch (e) {
//     errorHandler(res, e);
//   }
// };

//все учащиеся
module.exports.getAllStudent = async function (req, res) {
  try {
    const users = await User.find({ role: "учащийся" });

    res.json(users);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getCurrentUserById = async function (req, res) {
  try {
    await User.findById(req.params.id).then((user) => {
      res.send(user);
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

//удалить пользователя
module.exports.remove = async function (req, res) {
  try {
    await User.remove({ _id: req.params.id });
    res.json({
      message: "Пользователен удален.",
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

exports.updateUserPhoto = async function (req, res) {
  try {
    const userId = req.params.id;
    const image = req.file.path;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { image: image },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Фотография пользователя обновлена",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Не удалось обновить фотографию пользователя",
      error: err,
    });
  }
};

module.exports.updateUser = async function (req, res) {
  const { _id, fio, classA } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id },
      { $set: { fio, classA } },
      { new: true } // Получить обновленные данные пользователя
    );

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    return res.json({
      success: true,
      msg: "Данные пользователя обновлены",
      data: user, // Возвращаем обновленные данные пользователя
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Не удалось изменить данные пользователя" });
  }
};
