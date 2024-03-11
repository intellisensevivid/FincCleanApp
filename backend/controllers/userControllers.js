const User = require("../models/User");
const Role = require("../models/Role");
const asyncHandler = require("express-async-handler");

// @desc  Get user details
// @route GET api/users/:userId
// @access Private
const getUserDetails = asyncHandler(async (req, res) => {
  const id = req.params.userId;
  const user = await User.find({ _id: id });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

// @desc  Create new user
// @route POST api/users/create
// @access Private
const createUser = asyncHandler(async (req, res) => {
  const {
    fullName,
    phoneNumber,
    email,
    password,
    role,
    hourlyRate,
    monthlyPay,
    weeklyHours,
  } = req.body;
  // verify that all fields were filled
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // check for existing user
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "A user with that email already exists" });
  }

  const userRole = await Role.findOne({ name: role }).lean().exec();

  const newUser = await User.create({
    fullName,
    email,
    password,
    phoneNumber,
    business: req.user.business,
    role: userRole._id,
    hourlyRate,
    monthlyPay,
    weeklyHours,
  });

  res.status(201).json({ message: "User creation successful" });
});

// @desc  Update user details
// @route PUT api/users/:id/update
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const {
    fullName,
    phoneNumber,
    email,
    password,
    role,
    hourlyRate,
    monthlyPay,
    weeklyHours,
    isLockedOut,
  } = req.body;

  const userRole = await Role.find({ name: role });

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    {
      fullName,
      phoneNumber,
      email,
      password,
      role: userRole?._id,
      hourlyRate,
      monthlyPay,
      weeklyHours,
      isLockedOut,
    }
  );

  if (!updatedUser) {
    return res
      .status(404)
      .json({ message: "An error occured while updating the user" });
  }
  res.status(200).json({ message: "User info successfully updated" });
});

// @desc  Delete user
// @route DELETE api/users/:id/delete
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  await User.findOneAndDelete({ _id: userId });
  res.json({ message: "User successfully deleted" });
});

// @desc  Change user password
// @route DELETE api/users/changePassword
// @access Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const comparePassword = await user.comparePassword(currentPassword);
  if (!comparePassword) {
    return res.status(400).json({ message: "Incorrect current password" });
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
});

module.exports = {
  getUserDetails,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
};
