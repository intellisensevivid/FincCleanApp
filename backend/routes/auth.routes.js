const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  registerUser,
  registerAppUser,
  verifyEmail,
  loginUser,
  logOutUser,
  refresh,
  forgotPassword,
  resetPassword,
  configureStore,
} = require("../controllers/auth.controllers");
const schemaValidator = require("../middleware/schema.validator");
const { loginLimiter } = require("../middleware/login.limiter");
const { verifyToken } = require("../middleware/auth.middleware");
const Country = require("../models/country.model");

router.get("/refresh", loginLimiter, refresh);
router.post("/register", schemaValidator("authRegister"), registerUser);
router.post(
  "/register/client",
  body("fullName")
    .notEmpty()
    .withMessage("This field is required")
    .trim()
    .escape(),

  body("email")
    .notEmpty()
    .withMessage("This field is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail()
    .escape(),

  body("country")
    .notEmpty()
    .withMessage("This field is required")
    .custom(async (value) => {
      const c = await Country.findOne({ code: value });

      if (!c) {
        throw new Error(`${value} is not a valid country code`);
      }
    })
    .trim()
    .escape(),

  body("phoneNumber")
    .notEmpty()
    .withMessage("This field is required")
    .custom(async (value) => {
      const phoneRegex = /^\+[0-9]{1,3}[0-9]{7,15}$/gi;
      if (!phoneRegex.test(value)) {
        throw new Error("Please enter a valid phone number");
      }
    })
    .escape(),

  body("password")
    .notEmpty()
    .withMessage("This field is required")
    .isStrongPassword({
      minLength: 8,
      minSymbols: 1,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      "Password must include at least 8 characters, 1 symbol, 1 uppercase, 1 lowercase."
    )
    .trim()
    .escape(),
  registerAppUser
);
router.post("/verifyEmail", loginLimiter, verifyEmail);
router.post("/configureStore", loginLimiter, verifyToken, configureStore);
router.post(
  "/login",
  body("phoneNumber")
    .notEmpty()
    .withMessage("This field is required")
    .custom(async (value) => {
      const phoneRegex = /^\+[0-9]{1,3}[0-9]{7,15}$/gi;
      if (!phoneRegex.test(value)) {
        throw new Error("Please enter a valid phone number");
      }
    })
    .escape(),
  body("password")
    .notEmpty()
    .withMessage("This field is required")
    .trim()
    .escape(),
  loginLimiter,
  loginUser
);
router.post("/forgotPassword", loginLimiter, forgotPassword);
router.post("/resetPassword/:token", loginLimiter, resetPassword);
router.post("/logout", verifyToken, logOutUser);

module.exports = router;
