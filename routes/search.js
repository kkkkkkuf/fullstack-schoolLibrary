const express = require(`express`);
const controller = require(`../controllers/search`);
const router = express.Router();
const passport = require(`passport`);

router.post(
  `/`,
  passport.authenticate("jwt", { session: false }),
  controller.search
);

module.exports = router;
