import React, { useEffect } from "react";
import "../styles/ProductCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
const ProductCard = ({ product }) => {

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [inCart, setInCart] = React.useState(false);

  useEffect(() => {
    // console.log(cart);
    setInCart(cart.includes(product._id));
  }, [cart]);

  const handleBuyClick = () => {
    // const newCart = [...cart, product._id];
    dispatch(addToCart(product._id));
  };

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
            <div 
            className={`buy ${inCart ? "clicked" : ""}`}
            onClick={handleBuyClick}
            >
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
