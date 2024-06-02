const Attendance = require("../models/attendance.model");

const clockIn = async (req, res) => {
  try {
    const { userId, shiftId } = req.body;
    const clockInTime = new Date();
    const attendance = new Attendance({
      user: userId,
      shift: shiftId,
      clockIn: clockInTime,
      business: req.user.business,
    });
    await attendance.save();
    res.status(201).json({ message: "Clock-in recorded successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const clockOut = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found." });
    }
    attendance.clockOut = new Date();
    await attendance.save();
    res.json({ message: "Clock-out recorded successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAttendanceForEmployee = async (req, res) => {
  try {
    const { userId } = req.params;
    const attendance = await Attendance.find({ user: userId });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllAttendance = async (req, res) => {
  try {
    const allAttendance = await Attendance.find({
      business: req.user.business,
    });
    res.json(allAttendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const { clockIn, clockOut } = req.body;
    const attendance = await Attendance.findById({
      _id: attendanceId,
      business: req.user.business,
    });
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found." });
    }
    if (clockIn) {
      attendance.clockIn = new Date(clockIn);
    }
    if (clockOut) {
      attendance.clockOut = new Date(clockOut);
    }
    await attendance.save();
    res.json({ message: "Attendance updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const attendance = await Attendance.findByIdAndDelete(attendanceId);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found." });
    }
    res.json({ message: "Attendance deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  clockIn,
  clockOut,
  getAttendanceForEmployee,
  getAllAttendance,
  updateAttendance,
  deleteAttendance,
};
