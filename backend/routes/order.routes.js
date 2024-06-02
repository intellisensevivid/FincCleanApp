const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getAllOrdersForStore,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByCustomer,
  updateOrderStatus,
  updateOrderPaymentStatus,
  getOrderAnalytics,
  orderProcessingStatus,
  assignOrderToMachine,
} = require("../controllers/order.controllers");
const { verifyToken } = require("../middleware/auth.middleware");
const schemaValidator = require("../middleware/schema.validator");
const adminMiddleware = require("../middleware/admin.middleware");

router.get("/", verifyToken, adminMiddleware, getAllOrders);
router.get(
  "/store/:storeId",
  verifyToken,
  adminMiddleware,
  getAllOrdersForStore
);
router.get("/analytics", verifyToken, adminMiddleware, getOrderAnalytics);
router.get("/:orderId", verifyToken, getOrder);
router.post("/", verifyToken, schemaValidator("orderCreate"), createOrder);
router.patch("/:orderId/status", verifyToken, orderProcessingStatus);
router.patch("/:orderId/machine", verifyToken, assignOrderToMachine);
router.put("/:orderId", verifyToken, updateOrder);
router.delete("/:orderId/", verifyToken, adminMiddleware, deleteOrder);
router.get("/customer/:customerId/", verifyToken, getOrdersByCustomer);
router.put("/:orderId/status", verifyToken, updateOrderStatus);
router.put("/:orderId/payment", verifyToken, updateOrderPaymentStatus);

module.exports = router;
