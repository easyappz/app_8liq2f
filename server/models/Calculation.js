const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
  expression: {
    type: String,
    required: true,
    trim: true
  },
  result: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Calculation = mongoose.model('Calculation', calculationSchema);

module.exports = Calculation;
