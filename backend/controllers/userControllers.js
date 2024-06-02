require("express-async-errors");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../util/api.error");
const User = require("../models/User");
const Role = require("../models/Role");
const {
  permissionsData,
  isValidPermission,
} = require("../config/RolesAndPermission");
const Business = require("../models/Business");

/**
 * @param {Request} req
 * @param {Response} res
 * @description returns detail about the user in the request params
 * @protected
 * @returns detail about the user in the request params
 */

const getUserDetails = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findById(id)
      .populate("country", ["-__v"])
      .populate("role", ["_id", "name"]);

    res.status(StatusCodes.OK).json({
      data: user,
      statusCode: StatusCodes.OK,
    });
  } catch (e) {
    throw new BadRequestError(e.message);
  }
};

// @desc  Create new user (employees)
// @route POST api/users/create
// @access Private
const createUser = asyncHandler(async (req, res) => {
  const {
    fullName,
    phoneNumber,
    permissions,
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
    permissions,
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
    permissions,
    phoneNumber,
    email,
    password,
    role,
    hourlyRate,
    monthlyPay,
    weeklyHours,
    isLockedOut,
  } = req.body;

  const userRole = await Role.findOne({ name: role });

  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    {
      fullName,
      phoneNumber,
      email,
      password,
      role: userRole?._id,
      permissions,
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
  await User.findByIdAndDelete({ _id: userId });
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

// @desc get all store users including buisness owner
const getAllUsers = asyncHandler(async (req, res) => {
  const user = await User.find({ business: req.user.business })
    .populate("business", "name")
    .populate("role", "name")
    .exec();
  // const owner = await Business.find({ _id: req.user.business }).populate(
  //   "owner"
  // );
  // console.log(owner);
  return res.json({ data: user });
});
// @desc get all permissions
const getAllPermissions = asyncHandler(async (req, res, next) => {
  return res.json({ data: permissionsData });
});

// @desc assign user permission
const assignPermission = asyncHandler(async (req, res) => {
  const { permissions } = req.body;
  const { userId } = req.params;
  if (!userId || !permissions || !Array.isArray(permissions)) {
    res.status(400).json({ message: "Invalid input data" });
  }

  if (!isValidPermission(permissions)) {
    // Proceed with assigning the permissions or performing other operations
    res.status(400).json({ message: "Invalid permission data" });
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(400).json({ message: "User not found" });
  }

  user.permissions = permissions;
  await user.save();
});

// update user permission
// @desc assign user permission
const removePermission = asyncHandler(async (req, res) => {
  const { permissions } = req.body;
  const { userId } = req.params;
  if (!userId || !permissions || !Array.isArray(permissions)) {
    res.status(400).json({ message: "Invalid input data" });
  }

  if (!isValidPermission(permissions)) {
    // Proceed with assigning the permissions or performing other operations
    res.status(400).json({ message: "Invalid permission data" });
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(400).json({ message: "User not found" });
  }

  user.permissions = user.permissions.filter((k) => !permission.include(k));
  await user.save();
});

const getRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find().exec();
  return res.json({ message: "success", data: roles });
});
module.exports = {
  getUserDetails,
  getRoles,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
  assignPermission,
  getAllPermissions,
  removePermission,
  getAllUsers,
};
