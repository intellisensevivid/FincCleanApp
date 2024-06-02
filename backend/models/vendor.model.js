const { Schema, model } = require("mongoose");

const VendorSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
    required: true,
  },
  openingTime: {
    type: String,
    validate: {
      validator: function (value) {
        return /^(0[1-9]|1[0-2]):[0-5][0-9]\s*(AM|PM)$/.test(value);
      },
      message: "Invalid time format",
    },
    required: true,
  },
  closingTime: {
    type: String,
    validate: {
      validator: function (value) {
        return /^(0[1-9]|1[0-2]):[0-5][0-9]\s*(AM|PM)$/.test(value);
      },
      message: "Invalid time format",
    },
    required: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  reviews: {
    type: Schema.Types.ObjectId,
    ref: "Review",
  },
});

module.exports = model("Vendor", VendorSchema);
