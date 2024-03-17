const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  pickupDate: {
    type: Date,
  },
  pickupTime: {
    type: Date,
  },
  pickupStartTime: {
    type: Date,
  },
  pickupEndTime: {
    type: Date,
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Scheduled'
  },
  // Other pickup fields...
}, { timestamps: true });

const Pickup = mongoose.model('Pickup', pickupSchema);

module.exports = Pickup;
