const mongoose = require("mongoose");

const InventoryItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
    },
    section: {
      enum: [
        "washDryFold",
        "pickupAndDelivery",
        "retail",
        "alterationsAndRepair",
        "dryCleaning",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InventoryItem", InventoryItemSchema);
