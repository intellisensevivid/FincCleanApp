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
    }).populate("employee", "hourlyRate"); // Populating hourlyRate from Employee model

    // Initialize a map to store total hours worked by each employee
    const employeeHoursMap = new Map();

    // Calculate total hours worked for each employee
    attendanceRecords.forEach((attendance) => {
      const employeeId = attendance.employee._id;
      const shiftHours = calculateShiftHours(attendance.shift);
      const totalHours = employeeHoursMap.has(employeeId)
        ? employeeHoursMap.get(employeeId) + shiftHours
        : shiftHours;
      employeeHoursMap.set(employeeId, totalHours);
    });

    // Calculate gross pay and deductions for each employee
    const payrollData = [];
    for (const [employeeId, totalHours] of employeeHoursMap.entries()) {
      const employee = await Employee.findById(employeeId);
      const hourlyRate = employee.hourlyRate;
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
        employee: employeeId,
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
