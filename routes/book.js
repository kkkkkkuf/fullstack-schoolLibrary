const express = require(`express`);
const controller = require(`../controllers/book`);
const router = express.Router();
const passport = require(`passport`);

// router.get(`/books/search`, controller.search);
router.get(`/`, controller.getAllBook);
router.get(`/:id`, controller.getByBookId);
// router.get(`/forClass`, controller.getBookByClass);
router.delete(
  `/delete/:id`,
  passport.authenticate("jwt", { session: false }),
  controller.remove
);
router.post(
  `/create`,
  passport.authenticate("jwt", { session: false }),
  controller.create
);
router.put(
  `/update/:id`,
  passport.authenticate("jwt", { session: false }),
  controller.update
);

module.exports = router;
