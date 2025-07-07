const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: [
      "Cup",
      "Mug",
      "Jug",
      "Plate",
      "Cookware",
      "Bottle",
      "Dispenser",
      "Set",
      "Jar",
      "Stand",
      "Pedestal",
      "Vessel",
      "Goblet"
    ],
    required: true
  },
  stock: { type: Number, required: true },
  featured: { type: Boolean, default: false },
  new: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
