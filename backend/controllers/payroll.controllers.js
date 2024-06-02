const Payroll = require("../models/payroll.model");
const asyncHandler = require("express-async-handler");
const calculatePayroll = require("../util/payrollUtills");
// const Attendance = require('../models/attendance');

const getAllPayroll = asyncHandler(async (req, res) => {
  const payroll = await Payroll.find({ business: req.user.businessId }); // Fetch payroll entries for the logged-in business
  res.json(payroll);
});

const getSiglePayroll = asyncHandler(async (req, res) => {
  const payrollId = req.params;
  const payroll = await Payroll.find({
    _id: payrollId,
    business: req.user.businessId,
  }); // Fetch payroll entries for the logged-in business
  res.json(payroll);
});

const queryPayroll = asyncHandler(async (req, res) => {
  try {
    const { userId, startDate, endDate } = req.query;

    let query = {};

    // If userid is provided, filter payroll entries for the specific employee
    if (userId) {
      query.user = userId;
    }

    // If startDate and endDate are provided, filter payroll entries within the specified date range
    if (startDate && endDate) {
      query.startDate = { $gte: startDate };
      query.endDate = { $lte: endDate };
    }

    // Add more conditions as needed

    const payrollEntries = await Payroll.find(query);
    res.json(payrollEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const createPayroll = asyncHandler(async (req, res) => {
  const { startDate, endDate, overtimeRate, taxRate, insuranceRate } = req.body;

  const startDateObj = moment(startDate).startOf("day").toDate();
  const endDateObj = moment(endDate).endOf("day").toDate();

  const payrollData = await calculatePayroll(
    req.user.businessId,
    startDateObj,
    endDateObj,
    overtimeRate,
    taxRate
  );
  // Save payroll data to the database
  const payroll = await Payroll.insertMany(payrollData);
  res.json(payroll);
});

const updatePayroll = asyncHandler(async (req, res) => {
  s;
  const { payrollId } = req.params;
  const updatedPayrollData = req.body; // New payroll data to update
  const updatedPayroll = await Payroll.findByIdAndUpdate(
    payrollId,
    updatedPayrollData,
    { new: true }
  );
  res.json(updatedPayroll);
});

const deletePayroll = asyncHandler(async (req, res) => {
  const { payrollId } = req.params;
  await Payroll.findByIdAndDelete(payrollId);
  res.json({ message: "Payroll entry deleted successfully." });
});

module.exports = {
  getAllPayroll,
  getSiglePayroll,
  queryPayroll,
  createPayroll,
  updatePayroll,
  deletePayroll,
};
