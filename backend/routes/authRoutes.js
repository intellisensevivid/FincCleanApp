const express = require("express");
const router = express.Router();
const {
  registerUser,
  verifyEmail,
  loginUser,
  logOutUser,
  refresh,
  forgotPassword,
  resetPassword,
  configureStore,
} = require("../controllers/authControllers");
const schemaValidator = require("../middleware/schemaValidator");
const { loginLimiter } = require("../middleware/loginLimiter");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/refresh", loginLimiter, refresh);
router.post("/register", schemaValidator("authRegister"), registerUser);
router.post("/verifyEmail", loginLimiter, verifyEmail);
router.post("/configureStore", loginLimiter, verifyToken, configureStore);
router.post("/login", schemaValidator("authLogin"), loginLimiter, loginUser);
router.post("/forgotPassword", loginLimiter, forgotPassword);
router.post("/resetPassword/:token", loginLimiter, resetPassword);
router.post("/logout", logOutUser);

module.exports = router;
