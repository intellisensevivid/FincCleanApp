const mongoose = require("mongoose");
// const seedRoles = require("../seeders/seedRoles");
// const { addDefaultProducts } = require("../seeders/seedProducts");
require("dotenv").config();
const connectDB = async () => {
  try {
    console.log(process.env.DB_STRING);
    const conn = await mongoose.connect(process.env.DB_STRING);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    // seedRoles();
    // addDefaultProducts("65cf7c47f9107de57ceab49d");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
