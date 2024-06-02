const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/admin.middleware");
const schemaValidator = require("../middleware/schema.validator");
const { verifyToken } = require("../middleware/auth.middleware");
const {
  getAllPickups,
  createPickup,
  getPickupById,
  updatePickupById,
  deletePickupById,
} = require("../controllers/pickup.controllers");

router.post("/", verifyToken, createPickup);
router.get("/", verifyToken, getAllPickups);
router.get("/:pickupId", verifyToken, getPickupById);
router.patch("/:pickupId", verifyToken, updatePickupById);
router.delete("/:pickupId", verifyToken, deletePickupById);

module.exports = router;
