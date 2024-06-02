const express = require("express");
const router = express.Router();

const adminMiddleware = require("../middleware/admin.middleware");
const schemaValidator = require("../middleware/schema.validator");
const { verifyToken } = require("../middleware/auth.middleware");
const {
  getAllShifts,
  getSingleShiftsByiD,
  queryShifts,
  createShift,
  deleteShift,
} = require("../controllers/shift.controllers");

router.get("/", verifyToken, getAllShifts);
router.get("/search", verifyToken, queryShifts);
router.get("/:shiftId", verifyToken, getSingleShiftsByiD);

router.post("/", verifyToken, adminMiddleware, createShift);
router.patch("/:shiftId", verifyToken, adminMiddleware, createShift);
router.delete("/:shiftId", verifyToken, adminMiddleware, deleteShift);

module.exports = router;
