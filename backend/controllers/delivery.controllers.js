const asyncHandler = require('express-async-handler');
const Delivery = require('../models/delivery.model');

const createDelivery = asyncHandler(async (req, res) => {
  const {
    orderId,
    deliveryDate,
    deliveryStartTime,
    deliveryEndTime,
    location,
  } = req.body;

  // Check if order ID is provided
  if (!orderId) {
    return res.status(400).json({ message: "Order ID is required." });
  }

  // Check if order exists
  const orderExists = await Order.findById(orderId);
  if (!orderExists) {
    return res.status(404).json({ message: "Order not found." });
  }

  const delivery = await Delivery.create({
    order: orderId,
    deliveryDate,
    deliveryStartTime,
    deliveryEndTime,
    location,
  });
  res.status(201).json(delivery);
});

const getAllDeliveries = asyncHandler(async (req, res) => {
  const deliveries = await Delivery.find();
  res.json(deliveries);
});

const getDeliveryById = asyncHandler(async (req, res) => {
  const { deliveryId } = req.params;
  const delivery = await Delivery.findById(deliveryId);
  if (!delivery) {
    return res.status(404).json({ message: "Delivery not found." });
  }
  res.json(delivery);
});

const updateDeliveryById = asyncHandler(async (req, res) => {
  const { deliveryId } = req.params;
  const { deliveryDate, deliveryStartTime, deliveryEndTime, location, status } =
    req.body;

  // Check if delivery exists
  const delivery = await Delivery.findById(deliveryId);
  if (!delivery) {
    return res.status(404).json({ message: "Delivery not found." });
  }

  // Update delivery fields
  if (deliveryDate) delivery.deliveryDate = deliveryDate;
  if (deliveryStartTime) delivery.deliveryStartTime = deliveryStartTime;
  if (deliveryEndTime) delivery.deliveryEndTime = deliveryEndTime;
  if (location) delivery.location = location;
  if (status) delivery.status = status;

  // Save the updated delivery
  await delivery.save();

  res.json(delivery);
});

const deleteDeliveryById = asyncHandler(async (req, res) => {
  const { deliveryId } = req.params;
  const deletedDelivery = await Delivery.findByIdAndDelete(deliveryId);
  if (!deletedDelivery) {
    return res.status(404).json({ message: "Delivery not found." });
  }
  res.json({ message: "Delivery deleted successfully." });
});

module.exports = {
    createDelivery,
    getAllDeliveries,
    getDeliveryById,
    updateDeliveryById,
    deleteDeliveryById
};
