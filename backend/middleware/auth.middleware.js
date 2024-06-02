require("express-async-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { BadRequestError, PermissionDeniedError } = require("../util/api.error");
const TokenBlacklist = require("../models/tokenblacklist.model");

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new PermissionDeniedError(
      "Authentication credentials were not provided"
    );
  }

  const [bearer, token] = authorization.split(" ");

  if (!bearer || !token || bearer !== "Bearer") {
    throw new BadRequestError(
      "Authentication credentials were not properly formed"
    );
  }

  // check if token is blacklisted

  const isBlacklisted = await TokenBlacklist.findOne({ token });

  if (isBlacklisted) {
    throw new BadRequestError("Invalid credential. Token is no longer valid");
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      throw new BadRequestError(err);
    }

    const user = await User.findById(decoded.id)
      .populate({ path: "country", select: "-_id" })
      .populate("role")
      .populate("business");

    if (!user) {
      res.status(401).json({
        error: "No user associated with given token",
        statusCode: 401,
      });
    }

    req.user = user;
    next();
  });
};

const generateAccessToken = ({ id, email }) => {
  const accessToken = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  return {
    accessToken,
  };
};

const generateRefreshToken = ({ id, email }) => {
  const refreshToken = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return {
    refreshToken,
  };
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
