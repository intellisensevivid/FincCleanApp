const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
const schemaValidator = require("../middleware/schemaValidator");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  createDelivery,
  getAllDeliveries,
  getDeliveryById,
  updateDeliveryById,
  deleteDeliveryById,
} = require("../controllers/deliveryController");

router.post("/", verifyToken, createDelivery);
router.get("/", verifyToken, getAllDeliveries);
router.get("/:deliveryId", verifyToken, getDeliveryById);
router.patch("/:deliveryId", verifyToken, adminMiddleware, updateDeliveryById);
router.delete("/:deliveryId", verifyToken, adminMiddleware, deleteDeliveryById);

module.exports = router;
