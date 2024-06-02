const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ServiceSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  image: {
    type: String,
    trim: true,
    required: true,
  },
});

ServiceSchema.plugin(uniqueValidator, {
  message: "{PATH} already exists.",
});

module.exports = model("Service", ServiceSchema);
