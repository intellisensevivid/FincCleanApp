const express = require("express");
const router = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");
const schemaValidator = require("../middleware/schemaValidator");
const { verifyToken } = require("../middleware/authMiddleware");
const { getAllShifts, getSingleShiftsByiD, queryShifts, createShift, deleteShift } = require("../controllers/shiftController");

router.get("/", verifyToken, getAllShifts)
router.get("/search", verifyToken, queryShifts)
router.get("/:shiftId", verifyToken, getSingleShiftsByiD)

router.post("/",verifyToken,adminMiddleware, createShift)
router.patch("/:shiftId", verifyToken,adminMiddleware, createShift)
router.delete("/:shiftId", verifyToken, adminMiddleware, deleteShift)

module.exports = router