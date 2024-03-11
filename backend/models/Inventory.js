const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    minStock: {
      type: Number,
      default: 0,
    },
    maxStock: {
      type: Number,
      default: Infinity,
    },
    alertThreshold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", InventorySchema);

