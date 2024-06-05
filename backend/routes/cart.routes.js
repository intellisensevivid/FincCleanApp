const { Router } = require("express");
const { body } = require("express-validator");
const mongoose = require("mongoose");
const { getCart, addToCart } = require("../controllers/cart.controllers");
const { verifyToken } = require("../middleware/auth.middleware");

const router = Router();

router
  .route("/")
  .post(
    verifyToken,
    body("item")
      .notEmpty()
      .withMessage("This field is required")
      .custom(async (value) => {
        const res = mongoose.isValidObjectId(value);
        if (!res) {
          throw new Error("Please enter a valid mongoose object id");
        }
      }),
    body("quantity")
      .optional()
      .isNumeric()
      .withMessage("A number is expected")
      .default(1),
    addToCart
  )
  .get(verifyToken, getCart);

module.exports = router;
