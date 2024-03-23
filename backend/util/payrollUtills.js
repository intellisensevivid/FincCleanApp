const Attendance = require("../models/attendance");
const Payroll = require("../models/payroll");

async function calculatePayroll(
  businessId,
  startDate,
  endDate,
  overtimeRate = 1.5,
  taxRate = 0.2
) {
  try {
    // Retrieve attendance records for the specified pay period
    const attendanceRecords = await Attendance.find({
      "shift.business": businessId,
      clockIn: { $gte: startDate, $lt: endDate },
    }).populate("user", "hourlyRate"); // Populating hourlyRate from User model

    // Initialize a map to store total hours worked by each user
    const userHoursMap = new Map();

    // Calculate total hours worked for each user
    attendanceRecords.forEach((attendance) => {
      const userId = attendance.user._id;
      const shiftHours = calculateShiftHours(attendance.shift);
      const totalHours = userHoursMap.has(userId)
        ? userHoursMap.get(userId) + shiftHours
        : shiftHours;
      userHoursMap.set(userId, totalHours);
    });

    // Calculate gross pay and deductions for each user
    const payrollData = [];
    for (const [userId, totalHours] of userHoursMap.entries()) {
      const user = await User.findById(userId);
      const hourlyRate = user.hourlyRate;
      const overtimeHours = Math.max(totalHours - 8, 0); // Assuming overtime after 8 hours
      const regularHours = totalHours - overtimeHours;
      const regularPay = regularHours * hourlyRate;
      const overtimePay = overtimeHours * (hourlyRate * overtimeRate); // Calculating overtime pay with configurable rate
      const grossPay = regularPay + overtimePay;
      const deductions = calculateDeductions(grossPay, taxRate); // Calculate deductions with configurable tax rate
      const netPay = grossPay - deductions;

      // Create payroll entry
      const payrollEntry = new Payroll({
        business: businessId,
        user: userId,
        startDate,
        endDate,
        totalHours,
        regularHours,
        overtimeHours,
        hourlyRate,
        regularPay,
        overtimePay,
        grossPay,
        deductions,
        netPay,
      });
      payrollData.push(payrollEntry);
    }

    // Save payroll data to the database
    // await Payroll.insertMany(payrollData);

    return payrollData;
  } catch (error) {
    throw new Error("Payroll calculation failed: " + error.message);
  }
}

// Helper function to calculate shift hours
function calculateShiftHours(shift) {
  const startTime = new Date(shift.startTime);
  const endTime = new Date(shift.endTime);
  const durationInMs = endTime - startTime;
  const durationInHours = durationInMs / (1000 * 60 * 60); // Convert milliseconds to hours
  return durationInHours;
}

// Helper function to calculate deductions
function calculateDeductions(grossPay, taxRate) {
  return grossPay * taxRate; // Calculating deductions with configurable tax rate
}

module.exports = calculatePayroll;
