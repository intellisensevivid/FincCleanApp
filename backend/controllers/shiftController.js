const Shift = require('../models/shift');
const asyncHandler = require("express-async-handler");


// @desc Get all shift
// @route GET /API/shift
const getAllShifts = asyncHandler(async (req, res) => {
  const { business } = req.user;
  if (!business)
    return res
      .status(400)
      .json({ message: "business must be specified", status: 400 });
  const shifts = await Shift.find({ business })
    .populate("user", "fullName")
    .lean();
  return res.json({ message: "success", status: 200, data: shifts });
});
// @desc Get all shift by ID
// @route GET /API/shift/shiftId
const getSingleShiftsByiD = asyncHandler(async (req, res) => {
  const { shiftId } = req.params;
  if (!shiftId)
    return res
      .status(400)
      .json({ message: "Shift Id is required", status: 400 });
  const { business } = req.user;
  if (!business)
    return res
      .status(400)
      .json({ message: "Business must be specified", status: 400 });
  const shifts = await Shift.findById({ _id: shiftId })
    .populate("user")
    .exec()
    .lean();
  return res.json({ message: "success", status: 200, data: shifts });
});

// @desc search all shift
// @route GET /API/shift/search
const queryShifts = asyncHandler(async (req, res) => {
  const { startDate, endDate, user, task } = req.query;
  const { business } = req.user;
  if (!business)
    return res
      .status(400)
      .json({ message: "business must be specified", status: 400 });

  const query = {
    business: req.user.business,
  };
  if (startDate) {
    query.date = { $gte: new Date(startDate) };
  }
  if (endDate) {
    query.date = { ...query.date, $lte: new Date(endDate) };
  }
  if (user) {
    query.user = user;
  }
  if (task) {
    query.task = { $regex: task, $options: "i" };
  }

  const shifts = await Shift.find(query).populate("user");

  res.json({ message: "Success", data: shifts });
});

// @desc Create a new shift
// @route POST /api/shift
// @access Private
const createShift = asyncHandler(async (req, res) => {
  const { date, startTime, endTime, user, task } = req.body;
  if (!date || !startTime || !endTime || !user || !task) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newShift = await Shift.create({
    business: req.user.business,
    date,
    startTime,
    endTime,
    user,
    task,
  });
  return res
    .status(201)
    .json({ message: "success", status: 201, data: newShift });
});

// @desc update a Shift
// @route PATCH /api/shift/:shiftId
// @access Private
const updateShift = asyncHandler(async (req, res) => {
  const { shiftId } = req.params;
  const { date, startTime, endTime, user, task } = req.body;

  if (!shiftId)
    return res
      .status(400)
      .json({ message: "Shift Id is required", status: 400 });
  const updatedShift = await Shift.findByIdAndUpdate(
    { _id: shiftId, business: req.user.business },
    {
      date,
      startTime,
      endTime,
      user,
      task,
    },
    { new: true, runValidators: true }
  );
  if (!updatedShift) {
    return res
      .status(404)
      .json({ status: 400, message: "Shift not found", data: [] });
  }
  return res.json({ status: 200, message: Success, data: updatedShift });
});

// @desc Delete a Shift
// @route DELETE /api/shift/:shiftId
// @access Private
const deleteShift = asyncHandler(async (req, res) => { 
    const { shiftId } = req.params
    if (!shiftId) return res.status(400).json({ message: "Shift Id is required", status: 400 })

    const deleteShift = await Shift.findByIdAndDelete({ _id:shiftId, business: req.user.business,}).lean()

    if (!deleteShift) {
        return res.status(404).json({ status: 400, message: "Shift not found", data: [] })
    } 
    return res.json({ status: 200, message:Success, data:deleteShift })
})


module.exports = {
    getAllShifts,
    getSingleShiftsByiD,
    queryShifts,
    createShift,
    updateShift,
    deleteShift

}