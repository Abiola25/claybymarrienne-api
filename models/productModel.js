const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g. Mug, Bottle, Cookware
  price: { type: Number, required: true },
  size: { type: String },
  image: { type: String },
  description: { type: String },
  isNew: { type: Boolean, default: false } // 👈 New field added
});

module.exports = mongoose.model('Product', productSchema);