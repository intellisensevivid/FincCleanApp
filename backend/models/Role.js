const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    permissions: [
      {
        type: String,
      },
    ], //permissions granted based on user role
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", RoleSchema);
