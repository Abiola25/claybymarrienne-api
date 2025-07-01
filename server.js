const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/claybymarrienne", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Your routes go below
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Or routes like: app.use("/api/products", require("./routes/products"));

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/claybymarrienne', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Order Schema
const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  item: String,
  quantity: Number,
  createdAt: String,
  status: String
});

const Order = mongoose.model('Order', orderSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  description: String,
  type: String,
  stock: Number
});

const Product = mongoose.model('Product', productSchema);

// Routes — Orders
app.get('/api/orders', async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save order.' });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.patch('/api/orders/:id/status', async (req, res) => {
  const { status } = req.body;
  await Order.findByIdAndUpdate(req.params.id, { status });
  res.json({ success: true });
});

// Routes — Products
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error adding product.' });
  }
});
// Optional: Create Product (POST) route for admin use
// app.post('/api/products', async (req, res) => {
//   const newProduct = new Product(req.body);
//   await newProduct.save();
//   res.json({ success: true });
// });

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});