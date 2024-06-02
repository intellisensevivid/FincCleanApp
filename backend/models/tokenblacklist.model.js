const { Schema, model } = require("mongoose");

const TokenBlacklistSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("TokenBlacklist", TokenBlacklistSchema);
