const Pickup = require("../models/pickup");
const asyncHandler = require("express-async-handler");

const createPickup = asyncHandler(async (req, res) => {
  const pickup = await Pickup.create(req.body);
  res.status(201).json(pickup);

  res.status(500).json({ error: error.message });
});

const getAllPickups = asyncHandler(async (req, res) => {
  const pickups = await Pickup.find();
  res.json(pickups);

  res.status(500).json({ error: error.message });
});

const getPickupById = asyncHandler(async (req, res) => {
  const { pickupId } = req.params;
  const pickup = await Pickup.findById(pickupId);
  if (!pickup) {
    return res.status(404).json({ message: "Pickup not found." });
  }
  res.json(pickup);

  res.status(500).json({ error: error.message });
});

const updatePickupById = asyncHandler(async (req, res) => {
  const { pickupId } = req.params;
  const updatedPickup = await Pickup.findByIdAndUpdate(pickupId, req.body, {
    new: true,
  });
  if (!updatedPickup) {
    return res.status(404).json({ message: "Pickup not found." });
  }
  res.json(updatedPickup);

  res.status(500).json({ error: error.message });
});

const deletePickupById = asyncHandler(async (req, res) => {
  const { pickupId } = req.params;
  const deletedPickup = await Pickup.findByIdAndDelete(pickupId);
  if (!deletedPickup) {
    return res.status(404).json({ message: "Pickup not found." });
  }
  res.json({ message: "Pickup deleted successfully." });

  res.status(500).json({ error: error.message });
});

module.exports = {
  createPickup,
  getAllPickups,
  getPickupById,
  updatePickupById,
  deletePickupById,
};
