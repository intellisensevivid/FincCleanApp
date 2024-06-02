const express = require("express");
const router = express.Router();

const adminMiddleware = require("../middleware/admin.middleware");
const schemaValidator = require("../middleware/schema.validator");
const { verifyToken } = require("../middleware/auth.middleware");
const {
  getAllPayroll,
  updatePayroll,
  deletePayroll,
  createPayroll,
  queryPayroll,
  getSiglePayroll,
} = require("../controllers/payroll.controllers");

router.get("/", verifyToken, adminMiddleware, getAllPayroll);
router.get("/query", verifyToken, queryPayroll);
router.post("/", verifyToken, adminMiddleware, createPayroll);
router.get("/:payrollId", verifyToken, adminMiddleware, getSiglePayroll);
router.patch("/:payrollId", verifyToken, adminMiddleware, updatePayroll);
router.delete("/:payrollId", verifyToken, adminMiddleware, deletePayroll);

module.exports = router;
