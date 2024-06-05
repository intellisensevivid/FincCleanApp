const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const LaundryItemSchema = new Schema({
  type: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 255,
    required: true,
    unique: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1.0,
  },
});

LaundryItemSchema.plugin(uniqueValidator, {
  message: "Item with {PATH} already exists",
});

module.exports = model("LaundryItem", LaundryItemSchema);
