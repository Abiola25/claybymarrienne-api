import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-img" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">₦{product.price.toLocaleString()}</p>
      <p className="product-stock">
        <p class="product-price">₦68,000</p>
<button onclick="addToCart('123')" class="add-cart">🛒 Add to Cart</button>
        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
      </p>
      {product.featured && <span className="badge featured">🌟 Featured</span>}
      {product.new && <span className="badge new">🆕 New</span>}
    </div>
  );
};

export default ProductCard;