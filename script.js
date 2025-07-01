document.addEventListener('DOMContentLoaded', () => {
  let fullProductList = [];
  let cart = [];
  let allOrders = [];

  // UI Elements
  const productList = document.getElementById('product-list');
  const typeFilter = document.getElementById('typeFilter');
  const sortBy = document.getElementById('sortBy');
  const searchBar = document.getElementById('search-bar');
  const totalPriceEl = document.getElementById('total-price');
  const cartContainer = document.getElementById('cart-container');
  const cartTotal = document.getElementById('cart-total');
  const cartBadge = document.getElementById('cart-count');
  const cartBadgeContainer = document.getElementById('cart-badge-container');

  const statusFilter = document.getElementById('statusFilter');
  const searchInput = document.getElementById('searchInput');
  const ordersContainer = document.getElementById('orders-container');
  const orderSummary = document.getElementById('orderSummary');

  const checkoutForm = document.getElementById('checkout-form');
  const checkoutMessage = document.getElementById('checkout-message');

  // ========== PRODUCTS ==========
  if (productList) {
    fetch("https://claybymarrienne-api.onrender.com/products")
      .then(products => {
        fullProductList = products;
        displayProducts(products);
        updateTotal(products);
        setupProductFilters();
      });

    function displayProducts(productArray) {
  productList.innerHTML = '';
  productArray.forEach(product => {
    const isNew = product.isNew || false; // toggle flag on product data
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      ${isNew ? '<div class="ribbon">New</div>' : ''}
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h3>${product.name}</h3>
        <div class="stars">★★★★☆</div>
        <p class="price">₦${Number(product.price).toLocaleString()}</p>
        <p style="font-size: 0.85rem; color: #777;">${product.description || ''}</p>
        <button class="cart-btn"${product.stock === 0 ? ' disabled' : ''}>
          ${product.stock === 0 ? 'Sold Out' : 'Add to Cart 🛒'}
        </button>
      </div>
    `;

    productList.appendChild(card);
const productForm = document.getElementById('new-product-form');
if (productForm) {
  productForm.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(productForm);
    const data = Object.fromEntries(formData);
    data.price = parseFloat(data.price);
    data.stock = parseInt(data.stock);
    data.isNew = formData.get('isNew') === 'on';

    try {
      const res = await fetch('http://localhost:5005/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        productForm.reset();
        document.getElementById('form-message').textContent = '✅ Product added!';
      } else {
        document.getElementById('form-message').textContent = '❌ Failed to add.';
      }
    } catch (err) {
      console.error(err);
      document.getElementById('form-message').textContent = '❌ Server error.';
    }
  });
}
    const button = card.querySelector('.cart-btn');
    if (button) {
      button.addEventListener('click', () => {
        cart.push(product);
        updateCartDisplay();
      });
    }
  });
    }

    function updateTotal(products) {
      const total = products.reduce((sum, p) => {
        const price = Number(p.price);
        return sum + (!isNaN(price) ? price : 0);
      }, 0);
      if (totalPriceEl) totalPriceEl.textContent = `Total: ₦${total.toLocaleString()}`;
    }

    function setupProductFilters() {
      if (typeFilter) typeFilter.addEventListener('change', applyProductFilters);
      if (sortBy) sortBy.addEventListener('change', applyProductFilters);
      if (searchBar) {
        searchBar.addEventListener('input', () => {
          const term = searchBar.value.toLowerCase();
          document.querySelectorAll('.product-card').forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('p:nth-of-type(2)').textContent.toLowerCase();
            card.style.display = name.includes(term) || desc.includes(term) ? 'block' : 'none';
          });
        });
      }
    }

    function applyProductFilters() {
      let filtered = [...fullProductList];
      const selectedType = typeFilter?.value;
      const sortOption = sortBy?.value;

      if (selectedType && selectedType !== 'all') {
        filtered = filtered.filter(p => (p.type || '').toLowerCase() === selectedType.toLowerCase());
      }

      if (sortOption === 'low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'high') {
        filtered.sort((a, b) => b.price - a.price);
      }

      displayProducts(filtered);
      updateTotal(filtered);
    }
  }

  // ========== CATEGORY FILTER (TILE CLICK) ==========
  window.filterCategory = function(category) {
    if (typeFilter) {
      typeFilter.value = category;
      typeFilter.dispatchEvent(new Event('change'));
    }
    const productListSection = document.getElementById('product-list');
    if (productListSection) {
      window.scrollTo({ top: productListSection.offsetTop - 80, behavior: 'smooth' });
    }
  };

  // ========== CART ==========
  function updateCartDisplay() {
    if (!cartContainer || !cartTotal) return;

    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>No items yet.</p>';
      cartTotal.textContent = 'Total: ₦0';
    } else {
      cartContainer.innerHTML = '';
      let total = 0;

      cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        const price = Number(item.price) || 0;
        total += price;

        div.innerHTML = `
          ${item.name} — ₦${price.toLocaleString()}
          <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(div);
      });

      cartTotal.textContent = `Total: ₦${total.toLocaleString()}`;
    }

    if (cartBadge) cartBadge.textContent = cart.length;
  }

  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCartDisplay();
  };

  if (cartBadgeContainer) {
    cartBadgeContainer.addEventListener('click', () => {
      const cartSection = document.getElementById('cart-section');
      if (cartSection) {
        cartSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ========== CHECKOUT ==========
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', e => {
      e.preventDefault();
      if (cart.length === 0) {
        checkoutMessage.textContent = '🛑 Your cart is empty.';
        return;
      }

      const name = document.getElementById('customerName').value.trim();
      const phone = document.getElementById('customerPhone').value.trim();
      const itemSummary = cart.map(p => `${p.name} x1`).join(', ');

      const payload = {
        name,
        phone,
        item: itemSummary,
        quantity: cart.length,
        createdAt: new Date().toISOString(),
        status: 'Pending'
      };

      fetch('http://localhost:5005/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to submit order');
          return res.json();
        })
        .then(() => {
          checkoutMessage.textContent = '✅ Order placed successfully!';
          cart = [];
          updateCartDisplay();
          checkoutForm.reset();
        })
        .catch(() => {
          checkoutMessage.textContent = '❌ Failed to place order. Please try again.';
        });
    });
  }

  // ========== ORDERS ==========
  if (ordersContainer && orderSummary) {
    fetch('http://localhost:5005/api/orders')
      .then(res => res.json())
      .then(data => {
        allOrders = data;
        renderOrders(data);
        setupOrderFilters();
      });

    function renderOrders(data) {
      const counts = { Pending: 0, Shipped: 0, Delivered: 0 };
      data.forEach(o => {
        if (counts[o.status] !== undefined) counts[o.status]++;
      });

      orderSummary.textContent = `Pending: ${counts.Pending} | Shipped: ${counts.Shipped} | Delivered: ${counts.Delivered}`;
      ordersContainer.innerHTML = data.length === 0
        ? '<p>No orders found.</p>'
        : data.map(order => `
          <div class="order">
            <strong>${order.name}</strong> ordered <em>${order.item}</em> × ${order.quantity}<br/>
            <small>${new Date(order.createdAt).toLocaleString()}</small><br/>
            <select onchange="updateStatus('${order._id}', this.value)">
              ${['Pending', 'Shipped', 'Delivered'].map(
                status => `<option value="${status}" ${order.status === status ? 'selected' : ''}>${status}</option>`
              ).join('')}
            </select><br/>
            <button onclick="deleteOrder('${order._id}')">Delete</button>
          </div>
        `).join('');
    }
    }

    function setupOrderFilters() {
      if (statusFilter) statusFilter.addEventListener('change', applyOrderFilters);
      if (searchInput) searchInput.addEventListener('input', applyOrderFilters);
    }

    function applyOrderFilters() {
      const term = searchInput?.value.toLowerCase() || '';
      const status = statusFilter?.value || '';
      const filtered = allOrders.filter(order => {
        const matchText = `${order.name} ${order.item}`.toLowerCase();
        const statusMatch = !status || order.status === status;
        return matchText.includes(term) && statusMatch;
      });
      renderOrders(filtered);
    // Update Order Status
    window.updateStatus = function (id, newStatus) {
      fetch(`http://localhost:5005/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
        .then(() => console.log('✅ Status updated'))
        .catch(() => alert('Failed to update order status.'));
    };

    // Delete Order
    window.deleteOrder = function (id) {
      if (!confirm('Are you sure you want to delete this order?')) return;
      fetch(`http://localhost:5005/api/orders/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          allOrders = allOrders.filter(order => order._id !== id);
          renderOrders(allOrders);
        })
        .catch(() => alert('Failed to delete order.'));
    };
  }
});