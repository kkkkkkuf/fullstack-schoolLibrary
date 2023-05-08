const express = require(`express`);
const controller = require(`../controllers/user`);
const router = express.Router();
const upload = require("../middleware/upload");
const passport = require(`passport`);

// http://localhost:5000/api/users/login
router.post(`/login`, controller.login);
// http://localhost:5000/api/users/register
router.post(`/register`, controller.register);
// // http://localhost:5000/api/users/updaterole
// router.put(
//   "/updaterole",
//   passport.authenticate("jwt", { session: false }),
//   controller.updaterole
// );
// router.get(
//   `/allRead`,
//   passport.authenticate("jwt", { session: false }),
//   controller.getAll
// );

router.delete(
  `/delete/:id`,
  passport.authenticate("jwt", { session: false }),
  controller.remove
);

router.get(
  `/allStudent`,
  passport.authenticate("jwt", { session: false }),
  controller.getAllStudent
); //все учащиеся
// router.patch(`/:id`, controller.updateUserPhoto);
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("photo"),
  controller.updateUserPhoto
);
router.put(
  "/updateUser/:id",
  passport.authenticate("jwt", { session: false }),
  controller.updateUser
);
router.get(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  controller.getCurrentUserById
);

module.exports = router;
