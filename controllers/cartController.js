const Cart = require('../models/cartModel');
const TEMP_USER_ID = 'guest-user-123';

const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: TEMP_USER_ID }).populate('items.product') || { items: [] };
  const formatted = cart.items.map(item => ({
    id: item._id,
    name: item.product?.name || '[deleted]',
    price: item.product?.price || 0,
    quantity: item.quantity,
    subtotal: item.quantity * (item.product?.price || 0)
  }));
  res.json(formatted);
};

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: TEMP_USER_ID });
  if (!cart) cart = await Cart.create({ userId: TEMP_USER_ID, items: [] });

  const item = cart.items.find(i => i.product.toString() === productId);
  if (item) item.quantity += quantity;
  else cart.items.push({ product: productId, quantity });

  await cart.save();
  res.json({ message: 'Cart updated' });
};

const removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: TEMP_USER_ID });
  cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
  await cart.save();
  res.json({ message: 'Item removed' });
};

module.exports = { getCart, addToCart, removeFromCart };