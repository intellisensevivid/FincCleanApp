const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
const schemaValidator = require("../middleware/schemaValidator");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getAllPickups,
  createPickup,
  getPickupById,
  updatePickupById,
  deletePickupById,
} = require("../controllers/pickupController");

router.post("/", verifyToken, createPickup);
router.get("/", verifyToken, getAllPickups);
router.get("/:pickupId", verifyToken, getPickupById);
router.patch("/:pickupId", verifyToken, updatePickupById);
router.delete("/:pickupId", verifyToken, deletePickupById);

module.exports = router;
