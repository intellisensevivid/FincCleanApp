const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    numberOfStores: {
      type: String,
      required: true,
    },
    offersPickupAndDelivery: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", BusinessSchema);
