const { Router } = require("express");
const { body } = require("express-validator");
const {
  createItem,
  getItems,
} = require("../controllers/laundryitem.controllers");

const router = Router();

router
  .route("/")
  .post(
    body("type").notEmpty().withMessage("This field is required"),
    body("price").notEmpty().withMessage("This field is required").isNumeric(),
    createItem
  )
  .get(getItems);

module.exports = router;
