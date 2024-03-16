const mongoose = require('mongoose');


const shiftSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: Date, 
    required: true
  },
  endTime: {
    type: Date, 
    required: true
  },
  assignedEmployee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  task: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});


const Shift = mongoose.model('Shift', shiftSchema);

module.exports = Shift;
