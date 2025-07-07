const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const connectDB = require("./connectionstate");

const Product = require("./models/product");
const Order = require("./models/order");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

const app = express();
app.use(cors());
app.use(express.json());

// ─── API Routes ──────────────────────────────
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// ─── Stats Route ─────────────────────────────
app.get("/api/stats", async (req, res) => {
  try {
    const orders = await Order.find();
    const revenue = orders.reduce(
      (sum, order) => sum + order.cart.reduce((s, item) => s + item.price, 0),
      0
    );
    const totalOrders = orders.length;
    const totalProducts = await Product.countDocuments();

    res.json({ products: totalProducts, orders: totalOrders, revenue });
  } catch (err) {
    console.error("❌ Error fetching stats:", err.message);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// ─── Serve Frontend ───────────────────────────
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

// ─── Root Ping ────────────────────────────────
app.get("/", (req, res) => {
  res.send("ClayByMarienne API is live!");
});

// ─── Server & DB Init ─────────────────────────
const PORT = process.env.PORT || 5005;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});