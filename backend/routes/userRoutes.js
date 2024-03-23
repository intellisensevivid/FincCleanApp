const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const schemaValidator = require("../middleware/schemaValidator");
const {
  getUserDetails,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
  getAllUsers,
  getRoles,
} = require("../controllers/userControllers");

router.get("/store", verifyToken, getAllUsers);
router.get("/roles", verifyToken, getRoles);
router.get("/:userId", verifyToken, getUserDetails);
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
