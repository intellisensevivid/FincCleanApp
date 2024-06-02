const { Router } = require("express");
const { body } = require("express-validator");
const { createTransaction } = require("../controllers/transaction.controllers");
const { verifyToken } = require("../middleware/auth.middleware");

const router = Router();

router
  .route("/")
  .post(
    verifyToken,
    body("type")
      .notEmpty()
      .withMessage("This field is required")
      .isIn(["Withdrawal", "Deposit"])
      .withMessage(
        "transaction type must be either of `Withdrawal` or `Deposit`"
      )
      .trim()
      .escape(),
    body("amount")
      .notEmpty()
      .withMessage("This field is required")
      .isFloat(),
    createTransaction
  );
module.exports = router;
