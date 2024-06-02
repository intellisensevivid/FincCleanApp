const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/admin.middleware");
const schemaValidator = require("../middleware/schema.validator");
const { verifyToken } = require("../middleware/auth.middleware");
const {
  createDelivery,
  getAllDeliveries,
  getDeliveryById,
  updateDeliveryById,
  deleteDeliveryById,
} = require("../controllers/delivery.controllers");

router.post("/", verifyToken, createDelivery);
router.get("/", verifyToken, getAllDeliveries);
router.get("/:deliveryId", verifyToken, getDeliveryById);
router.patch("/:deliveryId", verifyToken, adminMiddleware, updateDeliveryById);
router.delete("/:deliveryId", verifyToken, adminMiddleware, deleteDeliveryById);

module.exports = router;
