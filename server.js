const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// ─── Express App Setup ───────────────────────
const app = express();
app.use(cors());
app.use(express.json());

// ─── Models ──────────────────────────────────
const Product = require("./models/product");
const Order = require("./models/order");

// ─── Routes ──────────────────────────────────
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// ─── Serve Frontend Static Files ─────────────
// Make sure your index.html and assets live inside a "public" folder
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ─── Root Check ──────────────────────────────
app.get("/", (req, res) => {
  res.send("ClayByMarienne API is live!");
});

// ─── Stats Route ─────────────────────────────
app.get("/api/stats", async (req, res) => {
  try {
    const orders = await Order.find();

    const revenue = orders.reduce(
      (sum, order) =>
        sum + order.cart.reduce((s, item) => s + item.price, 0),
      0
    );

    const totalOrders = orders.length;
    const totalProducts = await Product.countDocuments();

    res.json({
      products: totalProducts,
      orders: totalOrders,
      revenue
    });
  } catch (err) {
    console.error("❌ Error fetching stats:", err.message);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// ─── Mongo Connection ────────────────────────
const PORT = process.env.PORT || 5005;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));