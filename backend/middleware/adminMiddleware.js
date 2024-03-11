const asyncHandler = require("express-async-handler");

// checks if user is an admin
const adminMiddleware = async (req, res, next) => {
  if (!req.user || !req.user.role || req.user.role.name !== "admin") {
    return res.status(403).json({ message: "Access forbidden" });
  }
  next();
};

module.exports = adminMiddleware;
