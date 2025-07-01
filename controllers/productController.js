const Product = require('../models/productModel');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error('Failed to fetch:', err.message);
    res.status(500).json({ error: 'Could not load products' });
  }
};

module.exports = { getProducts };