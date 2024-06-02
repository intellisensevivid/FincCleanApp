const express = require("express");
const {
  getAllAttendance,
  getAttendanceForEmployee,
  clockIn,
  clockOut,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendance.controllers");
const router = express.Router();
const adminMiddleware = require("../middleware/admin.middleware");
const schemaValidator = require("../middleware/schema.validator");
const { verifyToken } = require("../middleware/auth.middleware");

router.get("/", verifyToken, getAllAttendance);
router.get("/:userId", verifyToken, getAttendanceForEmployee);
router.post("/clock-in", verifyToken, clockIn);
router.post("/clock-out", verifyToken, clockOut);

router.patch("/:attendanceId", verifyToken, adminMiddleware, updateAttendance);
router.delete("/:attendanceId", verifyToken, adminMiddleware, deleteAttendance);

module.exports = router;
