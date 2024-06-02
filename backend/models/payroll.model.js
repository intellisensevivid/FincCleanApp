const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business", // Assuming you have a Business model
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have an Employee model
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalHours: {
    type: Number,
    required: true,
  },
  regularHours: {
    type: Number,
    required: true,
  },
  overtimeHours: {
    type: Number,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  regularPay: {
    type: Number,
    required: true,
  },
  overtimePay: {
    type: Number,
    required: true,
  },
  grossPay: {
    type: Number,
    required: true,
  },
  deductions: {
    type: Number,
    required: true,
  },
  netPay: {
    type: Number,
    required: true,
  },
});

const Payroll = mongoose.model('Payroll', payrollSchema);

module.exports = Payroll;
