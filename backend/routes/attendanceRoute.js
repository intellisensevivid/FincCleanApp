const express = require('express');
const { getAllAttendance, getAttendanceForEmployee, clockIn, clockOut, updateAttendance, deleteAttendance } = require('../controllers/attendanceController');
const router = express.Router()
const adminMiddleware = require("../middleware/adminMiddleware");
const schemaValidator = require("../middleware/schemaValidator");
const { verifyToken } = require("../middleware/authMiddleware");


router.get('/',verifyToken,getAllAttendance)
router.get('/:employeeId',verifyToken, getAttendanceForEmployee)
router.post('/clock-in',verifyToken,clockIn)
router.post('/clock-out',verifyToken, clockOut)

router.patch('/:attendanceId',verifyToken,adminMiddleware, updateAttendance)
router.delete('/:attendanceId', verifyToken, adminMiddleware, deleteAttendance)


module.exports = router