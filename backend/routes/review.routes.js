const { Router } = require("express");
const { body, query } = require("express-validator");
const {
  createReview,
  getReviews,
} = require("../controllers/review.controllers");
const { verifyToken } = require("../middleware/authMiddleware");

const router = Router();

router
  .route("/")
  .post(
    verifyToken,
    body("vendor").notEmpty().withMessage("This field is required").escape(),
    body("rating")
      .notEmpty()
      .withMessage("This field is required")
      .isNumeric({})
      .withMessage("A number is expected"),
    body("comment").optional().default("").escape(),
    createReview
  )
  .get(
    query("vendor")
      .notEmpty()
      .withMessage("This parameter is required")
      .isLength({ min: 24, max: 24 }),
    getReviews
  );

module.exports = router;
