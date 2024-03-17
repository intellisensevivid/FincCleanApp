const asyncHandler = require('express-async-handler');
const Delivery = require('../models/delivery');

const createDelivery = asyncHandler(async (req, res) => {
    
        const delivery = await Delivery.create(req.body);
        res.status(201).json(delivery);
    
        res.status(500).json({ error: error.message })
})

const getAllDeliveries = asyncHandler(async (req, res) => {
    
    const deliveries = await Delivery.find();
    res.json(deliveries);

    res.status(500).json({ error: error.message })
})

const getDeliveryById = asyncHandler(async (req, res) => {
    
    const { deliveryId } = req.params;
    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) {
        return res.status(404).json({ message: 'Delivery not found.' });
    }
    res.json(delivery);

    res.status(500).json({ error: error.message })
})

const updateDeliveryById = asyncHandler(async (req, res) => {
    
    const { deliveryId } = req.params;
    const updatedDelivery = await Delivery.findByIdAndUpdate(deliveryId, req.body, { new: true });
    if (!updatedDelivery) {
        return res.status(404).json({ message: 'Delivery not found.' });
    }
    res.json(updatedDelivery);

    res.status(500).json({ error: error.message })
});

const deleteDeliveryById = asyncHandler(async (req, res) => {
    
    const { deliveryId } = req.params;
    const deletedDelivery = await Delivery.findByIdAndDelete(deliveryId);
    if (!deletedDelivery) {
        return res.status(404).json({ message: 'Delivery not found.' });
    }
    res.json({ message: 'Delivery deleted successfully.' });

    res.status(500).json({ error: error.message })
})

module.exports = {
    createDelivery,
    getAllDeliveries,
    getDeliveryById,
    updateDeliveryById,
    deleteDeliveryById
};
