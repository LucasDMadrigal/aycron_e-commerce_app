import React from "react";
import "../styles/ProductCard.css";
const ProductCard = ({ product }) => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="top">
           <img src={product.image} alt={product.name} className="product-image" />
        </div>
        <div className="bottom">
          <div className="left">
            <div className="details">
              <h1 className="card-title">{product.name}</h1>
              <p>${product.price}</p>
            </div>
            <div className="buy">
              <i className="material-icons">add_shopping_cart</i>
            </div>
          </div>
          <div className="right">
            <div className="done">
              <i className="material-icons">done</i>
            </div>
            <div className="details">
              <h1 className="card-title">Chair</h1>
              <p>Added to your cart</p>
            </div>
            <div className="remove">
              <i className="material-icons">clear</i>
            </div>
          </div>
        </div>
      </div>
      <div className="inside">
        <div className="icon">
          <i className="material-icons">info_outline</i>
        </div>
        <div className="contents">
          <h1 className="card-title--description">{product.name}</h1>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
