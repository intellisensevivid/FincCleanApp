const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const schemaValidator = require("../middleware/schema.validator");
const {
  getUserDetails,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
  getAllUsers,
  getRoles,
} = require("../controllers/user.controllers");

router.get("/store", verifyToken, getAllUsers);
router.get("/roles", verifyToken, getRoles);
router.get("/:userId", getUserDetails);
router.post(
  "/create",
  schemaValidator("userCreate"),
  verifyToken,
  adminMiddleware,
  createUser
);
router.patch(
  "/:userId/update",
  verifyToken,
  adminMiddleware,
  schemaValidator("userCreate"),
  updateUser
);
router.delete("/:userId/delete", verifyToken, adminMiddleware, deleteUser);
router.patch(
  "/changePassword",
  verifyToken,
  adminMiddleware,
  schemaValidator("userChangePassword"),
  changePassword
);

module.exports = router;
