const { Product, ProductSection } = require("../models/Product");
const asyncHandler = require("express-async-handler");

// @desc Create Products
// @route POST /api/products
// @access Private
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    section,
    image,
    productType,
    price,
    expressPrice,
    piecePerProduct,
    extraDays,
    upcharge,
    children,
  } = req.body;

  const productSection = await ProductSection.findOne({
    name: section,
    business: req.user.business,
  });
  if (!productSection) {
    return res.status(400).json({ message: "Invalid section" });
  }

  let newProduct;

  if (productType === "parent" && children && children.length > 0) {
    newProduct = await Product.create({
      name,
      section,
      image,
      children,
      business: req.user.business,
    });

    await Product.updateMany(
      { _id: { $in: children } },
      { parent: newProduct._id }
    );
  } else {
    newProduct = await Product.create({
      name,
      section: productSection._id,
      image,
      productType,
      price,
      expressPrice,
      piecePerProduct,
      extraDays,
      upcharge,
      business: req.user.business,
    });
  }

  res.status(201).json(newProduct);
});

// @desc Get all products
// GET /api/products
// @access Private
const getAllProducts = asyncHandler(async (req, res) => {
  const { business } = req.user;
  const products = await Product.find({ business }).lean();
  res.status(200).json(products);
});

// @desc Get a single product
// @route GET /api/products/:productId
// @access Private
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId).lean();

  if (product) {
    // Check if the product belongs to the requesting business/store
    if (product.business.toString() === req.user.business.toString()) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// @desc Update product
// @route PUT /api/products/:productId
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
  const { section, ...updatedFields } = req.body;

  const productSection = await ProductSection.findOne({ name: section });
  if (!productSection) {
    return res.status(400).json({ message: "Invalid section" });
  }

  let updatedProduct;

  if (req.body.parentType === "parent" && children && children.length > 0) {
    updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.productId, business: req.user.business },
      { section: productSection._id, ...updatedFields },
      { new: true, runValidators: true }
    ).lean();

    await Product.updateMany(
      { _id: { $in: children } },
      { parent: updatedProduct._id }
    );
  } else {
    updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.productId, business: req.user.business },
      { section: productSection._id, ...updatedFields },
      { new: true, runValidators: true }
    ).lean();
  }

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(updatedProduct);
});

// @desc Delete product
// @route DELETE /api/products/:productId
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.find({
    _id: productId,
    business: req.user.business,
  });

  if (!product) {
    res
      .status(404)
      .json({ message: "You are not authorized to delete this Product" });
  }

  if (product.productType === "parent") {
    await Product.deleteMany({
      $or: [{ _id: product._id }, { parent: product._id }],
    });
  } else {
    await Product.deleteOne({ _id: product._id });
  }

  const deletedProduct = await Product.findOneAndDelete({
    _id: productId,
    business: req.user.business,
  });

  res.json({ message: "Product deleted successfully" });
});

// @desc Create a new product section
// @route POST /api/products/sections
// @access  Private (Admin access)
const createProductSection = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const productSection = await ProductSection.create({
    name,
    business: req.user.business,
  });

  res.status(201).json(productSection);
});

// @desc Get all product section
// @route GET /api/products/sections
// @access  Private (Admin access)
const getAllProductSections = asyncHandler(async (req, res) => {
  const { business } = req.user;
  const sections = await ProductSection.find({ business }).lean();
  res.status(200).json(sections);
});

// @desc Update product section
// @route PUT /api/products/sections/:sectionId
// @access Private (Admin access)
const updateProductSection = asyncHandler(async (req, res) => {
  const updatedFields = req.body;

  const updatedSection = await ProductSection.findOneAndUpdate(
    { _id: req.params.sectionId, business: req.user.business },
    updatedFields,
    { new: true, runValidators: true }
  ).lean();

  if (!updatedSection) {
    return res.status(404).json({ message: "Product section not found" });
  }

  res.status(200).json(updatedSection);
});

// @desc Delete product section
// @route DELETE /api/products/sections/:sectionId
// @access Private (Admin access)
const deleteProductSection = asyncHandler(async (req, res) => {
  const { sectionId } = req.params;

  const deletedSection = await ProductSection.findOneAndDelete({
    _id: sectionId,
    business: req.user.business,
  });

  if (!deletedSection) {
    res
      .status(404)
      .json({ message: "You are not authorized to delete this Section" });
  }

  res.json({ message: "Product section deleted successfully" });
});

// @desc Get all products and sections for a store
// @route GET /api/products/store
// @access  Private
const getStoreProducts = asyncHandler(async (req, res) => {
  const { business } = req.user;
  const sections = await ProductSection.find({ business }).lean();
  const products = await Product.find({ business })
    .populate("children")
    .populate("section", "name")
    .populate("parent", "name")
    .lean();

  res.status(200).json({ products, sections });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductSection,
  getAllProductSections,
  updateProductSection,
  deleteProductSection,
  getStoreProducts,
};
