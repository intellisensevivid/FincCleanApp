const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const CustomerSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    telephone: {
      type: String,
    },
    secondaryTelephone: {
      type: String,
    },
    image: { type: String },
    streetAddress: {
      type: String,
    },
    aptNumber: {
      type: String,
    },
    city: {
      type: String,
    },
    postCode: {
      type: String,
    },
    notes: {
      type: String,
    },
    privateNotes: {
      type: String,
    },
    priceList: {
      type: String,
      default: "default",
    },
    driverInstructions: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ["payOnCollection", "cash", "card", "storeDefault"],
      default: "storeDefault",
    },
    marketing: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    invoiceStyle: {
      type: String,
      default: "default",
    },
    starch: {
      type: String,
      enum: [
        "noPreference",
        "noStarch",
        "lightStarch",
        "normalStarch",
        "heavyStarch",
      ],
      default: "noPreference",
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

CustomerSchema.index({ name: "text" });

CustomerSchema.pre("save", function (next) {
  const customer = this;
  if (!customer.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(customer.password, salt, (err, hash) => {
      if (err) return next(err);
      customer.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("Customer", CustomerSchema);
