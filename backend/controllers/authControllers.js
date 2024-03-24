const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Business = require("../models/Business");
const Role = require("../models/Role");
const { sendVerificationEmail } = require("../util/mailing");
const {
  generateSixDigitPin,
  generateResetToken,
  generateTokenHash,
} = require("../util/index");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middleware/authMiddleware");
const { addDefaultProducts } = require("../seeders/seedProducts");

// @desc  Register new user
// @route POST /api/auth/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    fullName,
    phoneNumber,
    email,
    password,
    companyName,
    location,
    numberOfStores,
  } = req.body;
  // verify that all fields were filled
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // check for existing user who is a business owner
  const existingUser = await User.findOne({ email: email, isOwner: true });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "A user with that email already exists" });
  }

  const newBusiness = await Business.create({
    name: companyName,
    location,
    numberOfStores,
  });

  const role = await Role.findOne({ name: "admin" }).lean().exec();

  const pin = generateSixDigitPin();

  await sendVerificationEmail({
    from: process.env.EMAIL,
    to: email,
    subject: "Verify your email",
    text: `Hello, please enter this six digit pin to verify your email: ${pin}`,
  });

  const newUser = await User.create({
    fullName,
    email,
    password,
    phoneNumber,
    business: newBusiness._id,
    role: role._id,
    emailVerificationPin: pin,
    isOwner: true,
  });

  newBusiness.owner = newUser._id;
  await newBusiness.save();

  res.status(201).json({ message: "User registration successful" });
});

// @desc  Verify user email
// @route POST /api/auth/verifyEmail
// @access Public
const verifyEmail = asyncHandler(async (req, res) => {
  const { pin } = req.body;
  if (!pin) {
    return res.status(400).json({ message: "Pin is required" });
  }
  const user = await User.findOne({ emailVerificationPin: pin });
  if (!user) {
    return res.status(400).json({ message: "Invalid verification pin" });
  }
  const business = await Business.findById(user.business);

  user.emailVerified = true;
  user.emailVerificationPin = undefined;
  business.verified = true;
  await user.save();
  await business.save();

  const { accessToken } = generateAccessToken({
    id: user._id,
    email: user.email,
  });
  const { refreshToken } = generateRefreshToken({
    id: user._id,
    email: user.email,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.status(200).json({ message: "User email verification successful" });
});

// @desc  Login user
// @route POST api/auth/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // verify that all fields were filled
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // check that user exist
  const user = await User.findOne({ email })
    .populate("business")
    .populate("role");
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const comparePassword = await user.comparePassword(password);
  if (!comparePassword) {
    return res.status(400).json({ message: "Incorrect email or password" });
  }

  const { accessToken } = generateAccessToken({
    id: user._id,
    email: user.email,
  });
  const { refreshToken } = generateRefreshToken({
    id: user._id,
    email: user.email,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000, // 15 minutes (match accessToken expiration)
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days (match refreshToken expiration)
  });

  const foundUser = await User.findOne({ email })
    .populate("business")
    .populate("role")
    .select("-password");

  res
    .status(200)
    .json({ message: "Login success", data: foundUser, accessToken });
});

// @desc  Refresh token
// @route GET /api/auth/refresh
// @access Public
const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized! Invalid or expired refresh token" });
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
  if (!decoded) {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
  // generate new access token
  const { accessToken } = generateAccessToken({
    id: decoded.id,
    email: decoded.email,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000, // 15 minutes (match accessToken expiration)
  });

  res.status(200).json({ message: "Token refreshed" });
});

// @desc  Log out user
// @route POST /api/auth/logout
// @access Public
const logOutUser = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({ message: "Log out successful" });
});

// @desc  Forgot password (sends mail to reset password)
// @route POST /api/auth/forgotPassword
// @access Public
const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const resetToken = generateResetToken();

  user.resetPasswordToken = generateTokenHash(resetToken);
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save();

  const resetURL = `${
    req.protocol
  }://${`laundromat.eduos.com.ng`}/resetpassword/${resetToken}`;

  const message = `
      <h1>Forgot your password?</h1>
      <p>Click the following link to reset your password:</p>
      <a href="${resetURL}" target="_blank">Reset Password</a>
      <p>If you didn't request a password reset, please ignore this email!</p>
    `;

  await sendVerificationEmail({
    from: process.env.EMAIL,
    to: user.email,
    subject: "Your password reset token (valid for 10 minutes)",
    html: message,
  });

  res.status(200).json({ message: "Token sent to email!" });
});

// @desc  Reset password
// @route POST /api/auth/resetPassword/:token
// @access Public
const resetPassword = asyncHandler(async (req, res, next) => {
  const hashedToken = generateTokenHash(req.params.token);
  const { newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Password do not match" });
  }

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Token is invalid or has expired" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successful!" });
});

// @desc  Reset password
// @route POST /api/auth/configureStore
// @access Private
const configureStore = asyncHandler(async (req, res) => {
  const { business } = req.user;
  const { language, pickupAndDelivery } = req.body;

  const store = await Business.findById(business);
  store.language = language;
  store.offersPickupAndDelivery = pickupAndDelivery;

  // seedProductSection(store._id);
  await addDefaultProducts(store._id);
  await store.save();

  res.status(200).json({ message: "Store successfully configured" });
});

module.exports = {
  registerUser,
  verifyEmail,
  configureStore,
  loginUser,
  refresh,
  logOutUser,
  forgotPassword,
  resetPassword,
};
