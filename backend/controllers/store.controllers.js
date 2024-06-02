const Business = require("../models/business.model");
const asyncHandler = require("express-async-handler");

// @desc    Get all stores
// @route   GET /api/stores
// @access  Public
const getAllStores = asyncHandler(async (req, res) => {
  const stores = await Business.find({});
  res.status(200).json({ success: true, data: stores });
});

// @desc    Get store by ID
// @route   GET /api/stores/:id
// @access  Public
const getStoreById = asyncHandler(async (req, res) => {
  const store = await Business.findById(req.params.businessId);

  if (!store) {
    return res.status(404).json({ success: false, error: "Store not found" });
  }

  res.status(200).json({ success: true, data: store });
});

// @desc    Search stores by name
// @route   GET /api/stores/search?name=:name
// @access  Public
const queryStore = asyncHandler(async (req, res) => {
  const { name, location } = req.query;
  const query = {};
  if (name) {
    query["name"] = { $regex: name, $options: "i" };
  }
  if (location) {
    query["location"] = { $regex: location, $options: "i" };
  }
  const stores = await Business.find(query);

  res.status(200).json({ success: true, data: stores });
});

// @desc    Create a new store
// @route   POST /api/stores
// @access  Private
const createStore = asyncHandler(async (req, res) => {
  const store = await Business.create(req.body);
  res.status(201).json({ success: true, data: store });
});

// @desc    Update a store
// @route   PUT /api/stores/:id
// @access  Private
const updateStore = asyncHandler(async (req, res) => {
  const store = await Business.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!store) {
    return res.status(404).json({ success: false, error: "Store not found" });
  }

  res.status(200).json({ success: true, data: store });
});

// @desc    Delete a store
// @route   DELETE /api/stores/:id
// @access  Private
const deleteStore = asyncHandler(async (req, res) => {
  const store = await Business.findByIdAndDelete(req.params.id);

  if (!store) {
    return res.status(404).json({ success: false, error: "Store not found" });
  }

  res.status(200).json({ success: true, data: {} });
});

module.exports = {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
  queryStore,
};
