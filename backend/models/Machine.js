const mongoose = require("mongoose");

const MachineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["washer", "dryer"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Machine", MachineSchema);
