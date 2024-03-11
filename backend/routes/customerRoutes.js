const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  createCustomer,
  getAllCustomers,
  searchCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  createAppCustomer,
} = require("../controllers/customerControllers");
const schemaValidator = require("../middleware/schemaValidator");

router.post(
  "/createAppCustomer",
  schemaValidator("appCustomerCreate"),
  createAppCustomer
);
router.post(
  "/",
  verifyToken,
  schemaValidator("customerCreate"),
  createCustomer
);
router.get("/", verifyToken, getAllCustomers);
router.get("/search", verifyToken, searchCustomers);
router.get("/:customerId", verifyToken, getCustomerById);
router.put("/:customerId", verifyToken, updateCustomer);
router.delete("/:customerId", verifyToken, deleteCustomer);

module.exports = router;
