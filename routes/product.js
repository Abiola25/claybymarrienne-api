const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// ─── GET All Products ─────────────────────────────
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ─── POST Create New Product ─────────────────────
router.post("/", async (req, res) => {
  const requiredFields = ["name", "price", "image", "type"];
  const missing = requiredFields.filter(field => !req.body[field]);

  if (missing.length) {
    return res.status(400).json({
      error: `Missing required field(s): ${missing.join(", ")}`
    });
  }

  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error creating product:", err.message);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// ─── DELETE Product by ID ─────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "✅ Product deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting product:", err.message);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;