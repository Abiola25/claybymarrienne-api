document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-list");
  const cartContainer = document.getElementById("cart-items");
  const toggleCart = document.getElementById("toggleCart");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  const cartPanel = document.getElementById("cart");
  const checkoutForm = document.getElementById("checkout-form");

  // Fetch products
  fetch('/api/products')
    .then(res => res.json())
    .then(products => {
      products.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>₦${product.price.toLocaleString()}</p>
          <p>${product.size}</p>
          <p>${product.description}</p>
          <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
        `;
        productContainer.appendChild(div);
      });
    });

  // Cart logic
  window.addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const found = cart.find(p => p._id === product._id);
    if (found) found.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  window.removeItem = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item._id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  window.changeQuantity = (id, delta) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.map(item => {
      if (item._id === id) {
        return { ...item, quantity: Math.max(item.quantity + delta, 1) };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  window.clearCart = () => {
    localStorage.removeItem("cart");
    renderCart();
  };

  function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      cartContainer.innerHTML += `
        <div class="cart-item">
          <strong>${item.name}</strong><br/>
          ₦${item.price} × 
          <button onclick='changeQuantity("${item._id}", -1)'>–</button>
          ${item.quantity}
          <button onclick='changeQuantity("${item._id}", 1)'>+</button>
          = ₦${(item.price * item.quantity).toLocaleString()}<br/>
          <button onclick='removeItem("${item._id}")'>Remove</button>
        </div>
      `;
    });
    cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
    cartTotal.textContent = `Total: ₦${total.toLocaleString()}`;
  }

  toggleCart.addEventListener("click", () => {
    cartPanel.classList.toggle("hidden");
  });

  checkoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) return alert("Your cart is empty!");

    const orderData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      items: cart
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    const result = await res.json();
    if (res.ok) {
      alert("Order placed successfully!");
      clearCart();
      checkoutForm.reset();
    } else {
      alert("Something went wrong: " + result.error);
    }
  });

  renderCart();
});