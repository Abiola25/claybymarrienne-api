let cart = [];

// Add product to cart
function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  return cart;
}

// Get all cart items
function getCartItems() {
  return cart;
}

// Clear the cart
function clearCart() {
  cart = [];
  return cart;
}

module.exports = { addToCart, getCartItems, clearCart };
