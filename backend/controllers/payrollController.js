const Payroll = require('../models/payroll')
const asyncHandler = require('express-async-handler')
// const Attendance = require('../models/attendance');


const getAllPayroll = asyncHandler(async (req, res) => {
      const payroll = await Payroll.find({ business: req.user.businessId }); // Fetch payroll entries for the logged-in business
      res.json(payroll);
  
})
  
const getSiglePayroll = asyncHandler(async (req, res) => {
    const payrollId = req.params
         const payroll = await Payroll.find({_id:payrollId, business: req.user.businessId }); // Fetch payroll entries for the logged-in business
      res.json(payroll);
})
  

const  queryPayroll = asyncHandler(async (req, res) => {
    try {
      const { employeeId, startDate, endDate } = req.query;

      let query = {};

      // If employeeId is provided, filter payroll entries for the specific employee
      if (employeeId) {
        query.employee = employeeId;
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
  })

const createPayroll = asyncHandler(async (req, res) => {
  const {startDate, endDate} = req.body
  const payrollData = await calculatePayroll(req.user.businessId); 
  res.json(payrollData);
})
  
const updatePayroll = asyncHandler(async (req, res) => {s
    const { payrollId } = req.params;
    const updatedPayrollData = req.body; // New payroll data to update
    const updatedPayroll = await Payroll.findByIdAndUpdate(payrollId, updatedPayrollData, { new: true });
    res.json(updatedPayroll);
 
})

const deletePayroll = asyncHandler( async (req, res) => {
  
    const { payrollId } = req.params;
    await Payroll.findByIdAndDelete(payrollId);
    res.json({ message: 'Payroll entry deleted successfully.' });

})


module.exports = {
  getAllPayroll,
  getSiglePayroll,
  queryPayroll,
  createPayroll,
  updatePayroll,
  deletePayroll
}