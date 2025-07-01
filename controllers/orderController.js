const Order = require('../models/order');
const Cart = require('../models/cartModel');
const TEMP_USER_ID = 'guest-user-123';

const placeOrder = async (req, res) => {
  const cart = await Cart.findOne({ userId: TEMP_USER_ID }).populate('items.product');
  if (!cart || !cart.items.length) return res.status(400).json({ message: 'Cart is empty' });

  const order = await Order.create({
    userId: TEMP_USER_ID,
    items: cart.items.map(i => ({
      product: i.product._id,
      quantity: i.quantity
    })),
    totalAmount: cart.items.reduce((sum, i) => sum + i.quantity * i.product.price, 0)
  });

  await Cart.deleteOne({ userId: TEMP_USER_ID });
  res.status(201).json({ message: 'Order placed!', order });
};

const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: TEMP_USER_ID }).populate('items.product');
  res.json(orders);
};

module.exports = { placeOrder, getOrders };