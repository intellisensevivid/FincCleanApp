const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const CountrySchema = new Schema({
  code: {
    type: String,
    minLength: 2,
    maxLength: 2,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

CountrySchema.plugin(uniqueValidator, {
  message: "User with {PATH} already exists",
});

module.exports = model("Country", CountrySchema);
