const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, default: 'Pending' } // New status field
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);