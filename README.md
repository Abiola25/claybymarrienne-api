## ✨ Features

### 🔗 Backend (API)
- Node.js + Express setup
- Serves 13 handcrafted clay products
- JSON endpoints for all products
- CORS-enabled for frontend integration

### 🛒 Frontend (Store)
- Displays product image, name, price, and description
- "Add to Cart" functionality
- Calculates subtotal and total
- "Remove from Cart" with real-time update

## 📂 Folder Structure
project-root/ ├── public/ │   ├── index.html │   ├── script.js │   └── style.css ├── src/ │   ├── controllers/ │   ├── routes/ │   ├── utils/ │   └── data/ ├── server.js ├── package.json

## 🚀 How to Run

### 1. Clone the Repo
```bash
git clone https://github.com/Abiola25/clayybymarrienne-api.git
cd clayybymarrienne-api

2. Install Dependencies

npm install

3. Start the Server
node server.js

The API will be available at:
http://localhost:5004/api/products

4. Open Frontend
You can either:
Use Live Server extension in VS Code and open public/index.html, or

Manually open the file in a browser:
file:///path-to-project/public/index.html

---

🧱 Products
This project showcases 13 handmade clay products including:

Water bottles
Clay cookware
Flower vases
Dispensers
Decorative items
All images are served from Cloudinary URLs, with complete product descriptions and prices.
---

🙌 Credits
Built by Abiola as part of a full-stack JavaScript development journey, powered by:
Node.js
Express
Vanilla JavaScript
HTML & CSS

Brand: Clayybymarrienne
Special thanks to the team for allowing us to use their product assets.


## 🚧 Work in Progress
This project is actively under development. Upcoming improvements include:

### 🔄 Upcoming Features
- ✅ Quantity selection for cart items
- ⏳ Save cart state using localStorage
- 📦 Checkout simulation
- 🌐 Deployment to GitHub Pages or Render
- 📱 Improved mobile responsiveness
- 🎨 Visual layout enhancements:
  - Modern product card grid
  - Clean typography
  - Clay-inspired color palette
  - Better styled cart and buttons


📌 License

MIT License — Free to use, modify, or share.
