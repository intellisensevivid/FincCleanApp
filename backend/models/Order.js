const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        bags: {
          type: Array,
        },
      },
    ],
    orderType: {
      type: String,
      enum: ["inStore", "pickupAndDelivery", "pickup", "delivery"],
      required: true,
    },
    pickupDate: {
      type: Date,
    },
    pickupTime: {
      type: Date,
    },
    pickupStartTime: {
      type: Date,
    },
    pickupEndTime: {
      type: Date,
    },
    deliveryDate: {
      type: Date,
    },
    deliveryStartTime: {
      type: Date,
    },
    deliveryEndTime: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isExpress: {
      type: Boolean,
      default: false,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "check", "payOnCollection", "storeDefault"],
      default: "storeDefault",
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
    startTime: { type: String },
    completedDate: { type: String },
    completedTime: { type: String },
    totalPrice: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
