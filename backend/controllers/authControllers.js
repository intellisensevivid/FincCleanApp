require("express-async-errors");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { validationResult, matchedData } = require("express-validator");
const parseRequestError = require("../util/error.parser");
const Business = require("../models/Business");
const Role = require("../models/Role");
const { sendVerificationEmail } = require("../util/mailing");
const User = require("../models/User");
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
const { ApiError, BadRequestError } = require("../util/api.error");
const { StatusCodes } = require("http-status-codes");
const Country = require("../models/country.model");
const TokenBlacklist = require("../models/tokenBlacklist");

// @desc  Register new user
// @route POST /api/auth/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  try {
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
    console.log(existingUser);
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
    console.log(newBusiness);

    const role = await Role.findOne({ name: "admin" }).lean().exec();
    console.log(role);
    const pin = generateSixDigitPin();
    console.log(pin);
    const send = await sendVerificationEmail({
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your email",
      text: `Hello, please enter this six digit pin to verify your email: ${pin}`,
    });
    console.log(send);

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
    console.log(newUser);
    newBusiness.owner = newUser._id;
    await newBusiness.save();

    res.status(201).json({ message: "User registration successful" });
  } catch (error) {
    console.log(error);
  }
});

/**
 * @param {Request} req
 * @param {Response} res
 * @route /POST /api/auth/register/client
 * @desc creates a new user for the client
 * @access public
 */
const registerAppUser = async (req, res) => {
  try {
    const error = parseRequestError(validationResult(req));

    if (error) {
      throw new BadRequestError(error);
    }

    const {
      fullName,
      email,
      country: countryCode,
      phoneNumber,
      password,
    } = matchedData(req);

    const country = await Country.findOne({
      code: countryCode,
    }).select("_id");

    const role = await Role.findOne({ name: "custom" }).select("_id");

    const user = new User({
      fullName,
      email,
      country: country?._id,
      phoneNumber,
      password,
      role: role?._id,
    });
    await user.save();

    res
      .status(StatusCodes.CREATED)
      .json({ data: user.toObject(), statusCode: StatusCodes.CREATED });
  } catch (e) {
    throw new BadRequestError(e?.message);
  }
};

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

/**
 * @param {Request} req
 * @param {Response} res
 * @route POST /api/auth/login
 * @desc provide access token for user authentication
 * @access public
 * @throws {Error} when email and password do not match any registered user
 */
const loginUser = async (req, res) => {
  try {
    const error = parseRequestError(validationResult(req));

    if (error) {
      throw new BadRequestError(error);
    }

    const { phoneNumber, password } = matchedData(req);

    // check that user exist
    const user = await User.findOne({ phoneNumber }).select("+password");

    if (!user) {
      throw new BadRequestError("No account associated with given email");
    }

    const comparePassword = await user.comparePassword(password);

    if (!comparePassword) {
      throw new BadRequestError("Password is incorrect");
    }

    const { accessToken } = generateAccessToken({
      id: user._id,
      email: user.email,
    });
    const { refreshToken } = generateRefreshToken({
      id: user._id,
      email: user.email,
    });

    await User.findByIdAndUpdate(user._id, {
      lastLoginAt: new Date(),
    });

    res.status(StatusCodes.OK).json({
      data: {
        accessToken,
        refreshToken,
      },
      statusCode: StatusCodes.OK,
    });
  } catch (e) {
    throw new BadRequestError(e?.message);
  }
};

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

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @route POST /api/auth/logout
 * @access protected
 */
const logOutUser = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const [_, token] = authorization.split(" ");

    await TokenBlacklist.create({ token });
    res.status(StatusCodes.OK).json({
      data: {
        message: "Logout successful",
      },
      statusCode: StatusCodes.OK,
    });
  } catch (e) {
    throw new ApiError(e.message);
  }
};

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
  registerAppUser,
  verifyEmail,
  configureStore,
  loginUser,
  refresh,
  logOutUser,
  forgotPassword,
  resetPassword,
};
