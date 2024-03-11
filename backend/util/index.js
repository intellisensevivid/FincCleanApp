const crypto = require("crypto");

const generateSixDigitPin = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const generateResetToken = () => {
  const token = crypto.randomBytes(20).toString("hex");
  return token;
};

const generateTokenHash = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
module.exports = { generateSixDigitPin, generateResetToken, generateTokenHash };
