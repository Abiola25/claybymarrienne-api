const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  customerPhone: String,
  cart: [
    {
      name: String,
      price: Number,
      qty: Number
    }
  ],
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);