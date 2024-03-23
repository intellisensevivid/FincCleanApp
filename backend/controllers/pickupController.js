const Pickup = require("../models/pickup");
const asyncHandler = require("express-async-handler");

const createPickup = asyncHandler(async (req, res) => {
  const {
    orderId,
    pickupDate,
    pickupTime,
    pickupStartTime,
    pickupEndTime,
    location,
  } = req.body;

  // Check if order ID is provided
  if (!orderId) {
    return res.status(400).json({ message: "Order ID is required." });
  }
  const orderExists = await Order.findById(orderId);
  if (!orderExists) {
    return res.status(404).json({ message: "Order not found." });
  }

  // Create a new pickup
  const pickup = await Pickup.create({
    order: orderId,
    pickupDate,
    pickupTime,
    pickupStartTime,
    pickupEndTime,
    location,
  });
  res.status(201).json(pickup);
});

const getAllPickups = asyncHandler(async (req, res) => {
  const pickups = await Pickup.find();
  if (!pickups) {
    return res.status(404).json({ message: "Pickups not found.", data: [] });
  }

  res.json({ data: pickups });
});

const getPickupById = asyncHandler(async (req, res) => {
  const { pickupId } = req.params;
  const pickup = await Pickup.findById(pickupId);
  if (!pickup) {
    return res.status(404).json({ message: "Pickup not found." });
  }
  res.json(pickup);
});

const updatePickupById = asyncHandler(async (req, res) => {
  const { pickupId } = req.params;
  const {
    pickupDate,
    pickupTime,
    pickupStartTime,
    pickupEndTime,
    location,
    status,
  } = req.body;

  // Check if pickup exists
  const pickup = await Pickup.findById(pickupId);
  if (!pickup) {
    return res.status(404).json({ message: "Pickup not found." });
  }

  // Update pickup fields
  if (pickupDate) pickup.pickupDate = pickupDate;
  if (pickupTime) pickup.pickupTime = pickupTime;
  if (pickupStartTime) pickup.pickupStartTime = pickupStartTime;
  if (pickupEndTime) pickup.pickupEndTime = pickupEndTime;
  if (location) pickup.location = location;
  if (status) pickup.status = status;
  await pickup.save();

  res.json(pickup);
});

const deletePickupById = asyncHandler(async (req, res) => {
  const { pickupId } = req.params;
  const deletedPickup = await Pickup.findByIdAndDelete(pickupId);
  if (!deletedPickup) {
    return res.status(404).json({ message: "Pickup not found." });
  }
  res.json({ message: "Pickup deleted successfully." });
});

module.exports = {
  createPickup,
  getAllPickups,
  getPickupById,
  updatePickupById,
  deletePickupById,
};
