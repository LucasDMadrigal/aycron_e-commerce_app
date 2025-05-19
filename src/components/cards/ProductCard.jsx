import React from "react";
import "../styles/ProductCard.css";
const ProductCard = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="top"></div>
        <div className="bottom">
          <div className="left">
            <div className="details">
              <h1 className="card-title">Chair</h1>
              <p>£250</p>
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
          <h1 className="card-title">Chair</h1>
          <p>£250</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
