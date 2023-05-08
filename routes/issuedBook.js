const express = require(`express`);
const controller = require(`../controllers/issuedBook`);
const router = express.Router();
const passport = require(`passport`);

router.get(
  `/read`,
  passport.authenticate("jwt", { session: false }),
  controller.getAllBookRead
);

router.post(
  `/takebook`,
  passport.authenticate("jwt", { session: false }),
  controller.takebook
);

router.get(
  `/viewsubmittedbooks/:email`,
  passport.authenticate("jwt", { session: false }),
  controller.getSubmittedBooks
);

router.get(
  `/viewissuedbooks/:email`,
  passport.authenticate("jwt", { session: false }),
  controller.getIssuedBooks
);

router.put(
  `/issuebook`,
  passport.authenticate("jwt", { session: false }),
  controller.putIssueBook
);

router.get(
  `/waitingIssued`,
  passport.authenticate("jwt", { session: false }),
  controller.getWaitingIssued
);

router.get(
  `/waitingReturned`,
  passport.authenticate("jwt", { session: false }),
  controller.getWaitingReturned
);

router.post(
  `/:userId/waitingReturned`,
  passport.authenticate("jwt", { session: false }),
  controller.getWaitingReturnedByEmail
);

router.get(
  `/issued`,
  passport.authenticate("jwt", { session: false }),
  controller.getIssued
);

router.delete(
  `/delete/:id`,
  passport.authenticate("jwt", { session: false }),
  controller.deleteById
);

// Продление сроков выдачи книги пользователем
router.post(
  "/extend",
  passport.authenticate("jwt", { session: false }),
  controller.extendBook
);

module.exports = router;
