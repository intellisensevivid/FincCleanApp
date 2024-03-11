const mongoose = require("mongoose");

const ProductSectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
  },
  { timestamps: true }
);

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductSection",
      required: true,
    },
    image: {
      type: String,
    },
    productType: {
      type: String,
      enum: ["normal", "parent", "weight"],
      default: "normal",
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: null,
      },
    ],
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
    price: {
      type: Number,
      default: 0,
    },
    expressPrice: {
      type: Number,
      default: 0,
    },
    piecePerProduct: {
      type: Number,
      default: 1,
    },
    extraDays: {
      type: Number,
      default: 0,
    },
    upcharge: {
      type: Number,
      default: 0,
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
  },
  { timestamps: true }
);

const ProductSection = mongoose.model("ProductSection", ProductSectionSchema);
const Product = mongoose.model("Product", ProductSchema);

module.exports = {
  ProductSection,
  Product,
};
