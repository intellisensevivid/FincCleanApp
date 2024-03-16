const Attendance = require('../models/attendance');
const Employee = require('../models/Employee');
const Payroll = require('../models/payroll');

async function calculatePayroll(businessId, startDate, endDate) {
  try {
    // Retrieve attendance records for the specified pay period
    const attendanceRecords = await Attendance.find({
      'shift.business': businessId,
      clockIn: { $gte: startDate, $lt: endDate }
    }).populate('employee', 'hourlyRate'); // Populating hourlyRate from Employee user model

    // Initialize a map to store total hours worked by each employee
    const employeeHoursMap = new Map();

    // Calculate total hours worked for each employee
    attendanceRecords.forEach(attendance => {
      const employeeId = attendance.employee._id;
      const shiftHours = calculateShiftHours(attendance.shift);
      const totalHours = employeeHoursMap.has(employeeId) ? employeeHoursMap.get(employeeId) + shiftHours : shiftHours;
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
      const overtimePay = overtimeHours * (hourlyRate * 1.5); // Assuming 1.5 times the hourly rate for overtime
      const grossPay = regularPay + overtimePay;
      const deductions = calculateDeductions(grossPay); // Calculate deductions (e.g., taxes, insurance)
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
        netPay
      });
      payrollData.push(payrollEntry);
    }

    // Save payroll data to the database
    await Payroll.insertMany(payrollData);

    return payrollData;
  } catch (error) {
    throw new Error('Payroll calculation failed: ' + error.message);
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

// Helper function to calculate deductions (example implementation)
function calculateDeductions(grossPay) {
  // Example deduction calculation (e.g., 20% for taxes)
  return grossPay * 0.2; // Assuming 20% tax rate
}

module.exports = calculatePayroll;
