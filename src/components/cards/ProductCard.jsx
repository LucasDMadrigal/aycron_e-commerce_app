import React, { useState } from "react";
import "../styles/ProductCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

const ProductCard = ({ product, selected }) => {
  const [productToCart, setProductToCart] = useState({
    ...product,
    quantity: 1,
  });
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const handleToggleBuyClick = () => {
    if (cart.some((prod) => prod._id === product._id)) {
      dispatch(removeFromCart(product));
    } else {
      dispatch(addToCart(productToCart));
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="top">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>
        {/* <div className={`bottom clicked`}> */}
        <div className={`bottom ${selected ? "clicked" : ""}`}>
          <div className="left">
            <div className="details">
              <h1 className="card-title">{product.name}</h1>
              <p>${product.price}</p>
            </div>
            <div className="buy" onClick={handleToggleBuyClick}>
              {/* <div className="buy" > */}
              <i className="material-icons">add_shopping_cart</i>
            </div>
          </div>
          <div className="right">
            <div className="done">
              <i className="material-icons">done</i>
            </div>
            <div className="details">
              <h1 className="card-title">{product.name}</h1>
              <p>${product.price}</p>
            </div>
            <div className="remove" onClick={handleToggleBuyClick}>
              {/* <div className="remove"> */}
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
          <h1 className="card-title--description">{product.name}!!</h1>
          <p>${product.price}</p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
