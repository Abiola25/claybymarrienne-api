const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Create order
router.post("/", async (req, res) => {
  try {
    const { customerName, customerPhone, cart } = req.body;

    if (!customerName || !customerPhone || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Missing required fields or empty cart" });
    }

    const order = new Order({
      customerName,
      customerPhone,
      cart,
      status: "Pending"
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: "Order placed successfully", order: savedOrder });

  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Update order status
router.put("/:id", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update order status" });
  }
});

module.exports = router;