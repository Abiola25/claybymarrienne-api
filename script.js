let products = [];
let cart = [];
let wishlist = [];
let confirmedOrders = [];
let receiptNo = "CBM" + Math.floor(Math.random() * 900000 + 100000);

// 🛍️ Fetch and Render Products
document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/products")
    .then(res => res.json())
    .then(data => {
      products = data;
      renderProducts(products);
      insertSpotlight(products);
    });
fetch("/some-endpoint")
  .then(res => {
    if (!res.ok || res.headers.get("content-type")?.includes("text/html")) {
      throw new Error("Invalid JSON response");
    }
    return res.json();
  })
  .then(data => { /* ... */ })
  .catch(err => console.error("Fetch error:", err));
  const faders = document.querySelectorAll(".fade-in");
  const appear = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  faders.forEach(f => appear.observe(f));

  setInterval(() => {
    const track = document.querySelector(".carousel-track");
    if (track) {
      track.scrollBy({ left: 240, behavior: "smooth" });
    }
  }, 4000);
});
function renderProducts(items) {
  const shop = document.getElementById("shop-products");
  const featured = document.querySelector(".carousel-track");
  shop.innerHTML = "";
  featured.innerHTML = "";

  items.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.style.setProperty("--fade-delay", `${index * 0.1}s`);

    div.innerHTML = `
      <div class="wishlist-icon" onclick="toggleWishlist('${product._id}')">
        ${wishlist.includes(product._id) ? "💖" : "🤍"}
      </div>
      ${product.new ? `<span class="new-tag">New</span>` : ""}
      <img src="${product.image}" onclick="openModal('${product._id}')" />
      <h3>${product.name}</h3>
      <small class="product-description">${product.description}</small>
      <span class="product-type">${product.type}</span>
      <span class="stock-badge">${product.stock > 0 ? product.stock + " in stock" : "Out of stock"}</span>
      <p class="product-price">₦${product.price.toLocaleString()}</p>
      <button onclick="addToCart('${product._id}')" class="add-cart">Add to Cart</button>
    `;
    shop.appendChild(div);

    if (product.featured) {
      const featuredItem = document.createElement("div");
      featuredItem.className = "carousel-item";
      featuredItem.innerHTML = `
        <img src="${product.image}" />
        <h4>${product.name}</h4>
        <p class="product-price">₦${product.price.toLocaleString()}</p>
      `;
      featured.appendChild(featuredItem);
    }
  });
}

function toggleWishlist(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(w => w !== id);
  } else {
    wishlist.push(id);
  }
  renderProducts(products);
}
function handleSearch() {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(term) || p.type.toLowerCase().includes(term)
  );
  renderProducts(filtered);
}

function handleSort(order) {
  let sorted = [...products];
  if (order === "low") sorted.sort((a, b) => a.price - b.price);
  if (order === "high") sorted.sort((a, b) => b.price - a.price);
  if (order === "new") sorted = sorted.filter(p => p.new);
  renderProducts(sorted);
}

function filterProducts(type) {
  if (type === "All") {
    renderProducts(products);
    return;
  }
  const filtered = products.filter(p =>
    p.type === type || (type === "New" && p.new === true)
  );
  renderProducts(filtered);
}
function openModal(id) {
  const product = products.find(p => p._id === id);
  if (!product) return;

  document.getElementById("modal-image").src = product.image;
  document.getElementById("modal-name").textContent = product.name;
  document.getElementById("modal-desc").textContent = product.description;

  const addBtn = document.getElementById("modal-add");
  addBtn.onclick = () => addToCart(id);

  document.getElementById("product-modal").style.display = "flex";
}

document.getElementById("modal-close").onclick = () => {
  document.getElementById("product-modal").style.display = "none";
};

document.getElementById("product-modal").addEventListener("click", (e) => {
  if (e.target.id === "product-modal") {
    document.getElementById("product-modal").style.display = "none";
  }
});
function addToCart(id) {
  const item = products.find(p => p._id === id);
  if (!item || item.stock <= 0) {
    return alert("Item out of stock!");
  }

  cart.push({ ...item });
  updateCartDisplay();

  // 💬 Pulse Activity Feed
  const feed = document.getElementById("activity-feed");
  feed.textContent = `${item.name} added to cart by visitor`;
  setTimeout(() => {
    feed.textContent = "Someone is browsing... 🛍️";
  }, 4000);

  // ✨ Button Pop Animation
  const buttons = document.querySelectorAll(".add-cart");
  buttons.forEach(btn => {
    if (btn.getAttribute("onclick") === `addToCart('${id}')`) {
      btn.classList.add("pop");
      setTimeout(() => btn.classList.remove("pop"), 300);
    }
  });
}
function updateCartDisplay() {
  const cartZone = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  const badge = document.getElementById("cart-badge"); // Optional if using a badge somewhere
  cartZone.innerHTML = "";

  let sum = 0;
  cart.forEach((item, index) => {
    sum += item.price;
    const entry = document.createElement("div");
    entry.className = "cart-entry";
    entry.innerHTML = `
      ${item.name} – ₦${item.price.toLocaleString()}
      <button onclick="removeCartItem(${index})">Remove</button>
    `;
    cartZone.appendChild(entry);
  });

  total.textContent = sum.toLocaleString();
  if (badge) badge.textContent = cart.length;
}

function removeCartItem(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}
function checkout() {
  const panel = document.getElementById("checkout-panel");
  panel.classList.add("show");
  panel.scrollIntoView({ behavior: "smooth" });
}
function submitOrder() {
  const name = document.getElementById("cust-name").value.trim();
  const phone = document.getElementById("cust-phone").value.trim();
  const code = document.getElementById("cust-code").value.trim();

  if (!name || !phone || cart.length === 0) {
    return alert("Please enter your name, phone number, and add items to cart.");
  }

  document.getElementById("confirmation-message").textContent = `Thank you, ${name}! Your order has been confirmed.`;
  document.getElementById("inv-name").textContent = name;
  document.getElementById("inv-phone").textContent = phone;
  document.getElementById("inv-date").textContent = new Date().toLocaleDateString();
  document.getElementById("inv-number").textContent = receiptNo;

  const invItems = document.getElementById("inv-items");
  invItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x1 – ₦${item.price.toLocaleString()}`;
    invItems.appendChild(li);
    total += item.price;
  });

  document.getElementById("inv-total").textContent = total.toLocaleString();
  document.getElementById("order-confirmation").style.display = "block";
  document.getElementById("order-confirmation").scrollIntoView({ behavior: "smooth" });

  confirmedOrders.push({ name, phone, items: [...cart], total });
  renderAdminPanel();
  cart = [];
  updateCartDisplay();
}
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const name = document.getElementById("inv-name").textContent;
  const phone = document.getElementById("inv-phone").textContent;
  const date = document.getElementById("inv-date").textContent;
  const receipt = document.getElementById("inv-number").textContent;
  const items = [...document.querySelectorAll("#inv-items li")].map(li => li.textContent);
  const total = document.getElementById("inv-total").textContent;

  doc.setFontSize(16);
  doc.text("ClayByMarienne – Order Receipt", 20, 20);
  doc.setFontSize(12);
  doc.text(`Receipt No: ${receipt}`, 20, 30);
  doc.text(`Name: ${name}`, 20, 38);
  doc.text(`Phone: ${phone}`, 20, 46);
  doc.text(`Date: ${date}`, 20, 54);
  doc.text("Items:", 20, 64);

  items.forEach((item, index) => {
    doc.text(`• ${item}`, 25, 72 + index * 8);
  });

  doc.text(`Total: ₦${total}`, 20, 80 + items.length * 8);
  doc.save(`${receipt}.pdf`);
}
function printReceipt() {
  const original = document.body.innerHTML;
  const receipt = document.getElementById("order-confirmation").innerHTML;
  document.body.innerHTML = `<div class="print-receipt">${receipt}</div>`;
  window.print();
  document.body.innerHTML = original;
  location.reload();
}

function closeConfirmation() {
  document.getElementById("order-confirmation").style.display = "none";
  document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
}
function renderAdminPanel() {
  const adminZone = document.getElementById("admin-orders");
  adminZone.innerHTML = "";

  if (confirmedOrders.length === 0) {
    adminZone.innerHTML = "<p>No orders confirmed yet.</p>";
    return;
  }

  confirmedOrders.forEach((order, index) => {
    const entry = document.createElement("div");
    entry.innerHTML = `
      <strong>Order ${index + 1}</strong><br>
      Name: ${order.name} <br>
      Phone: ${order.phone} <br>
      Items: ${order.items.map(i => i.name).join(", ")}<br>
      Total: ₦${order.total.toLocaleString()}<hr>
    `;
    adminZone.appendChild(entry);
  });
}

function downloadAllOrders() {
  const blob = new Blob([JSON.stringify(confirmedOrders, null, 2)], {
    type: "application/json"
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "ClayByMarienne_Orders.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
