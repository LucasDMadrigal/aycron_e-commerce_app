import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCartState,
  removeItemFromCart,
  updateCartItemQuantity,
} from "../redux/actions/cartActions";
import "./styles/Cart.css";
import axios from "axios";
import { useNavigate } from "react-router";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.auth.user.userId);
  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const cartWithQuantity = cart.map((prod) => ({
      ...prod,
    }));
    console.log("🚀 ~ cartWithQuantity ~ cartWithQuantity:", cartWithQuantity);

    const total = cartWithQuantity.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotal(total.toFixed(2));
    setProducts(cartWithQuantity);
  }, [cart]);

  const handleModifyQuantity = (prodId, action) => {
    const targetProduct = products.find((item) => item.product._id === prodId);
    if (!targetProduct) return;

    let newQuantity = targetProduct.quantity;

    if (action === "sum") {
      newQuantity += 1;
    } else {
      newQuantity = Math.max(targetProduct.quantity - 1, 1);
    }

    if (newQuantity === targetProduct.quantity) return;

    dispatch(updateCartItemQuantity(prodId, newQuantity, userId, token));
  };

  const handleRemoveProduct = (prodId) => {
    const updatedProducts = products.filter((prod) => prod._id !== prodId);
    dispatch(removeItemFromCart(prodId, token));
    setProducts(updatedProducts);
  };

  const handleCheckout = () => {
    console.log("🚀 ~ handleCheckout ~ products:", products);

    axios
      .post(
        `${import.meta.env.VITE_API_URL}purchase/create`,
        {
          products,
          user_id: userId,
          total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        axios
          .delete(`${VITE_API_URL}carts`, {
            headers: { Authorization: `Bearer ${token}` },
            data: { userId },
          })
          .then(() => {
            dispatch(clearCartState());
            window.alert("✅ Checkout completo y carrito eliminado");
            navigate("/");
          });
        console.log("🚀 ~ .then ~ response:", response.data);
      });
  };
  return (
    <>
      <h1>Cart</h1>
      {products.length === 0 ? (
        <h2>Cart is empty</h2>
      ) : (
        <table className="cart--table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th width="100px">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <tr key={item.product._id}>
                  <td>{item.product.name}</td>
                  <td>${item.product.price}</td>
                  <td>
                    <button
                      className="button--table"
                      onClick={() =>
                        handleModifyQuantity(item.product._id, "sub")
                      }
                      type="button"
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      className="button--table"
                      onClick={() =>
                        handleModifyQuantity(item.product._id, "sum")
                      }
                      type="button"
                    >
                      +
                    </button>
                  </td>
                  <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                  <td className="actions">
                    <button
                      className="button--table"
                      onClick={() => handleRemoveProduct(item.product._id)}
                      type="button"
                    >
                      <i className="material-icons delete_forever">
                        delete_forever
                      </i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className="cart_responsive--container">
        {products.map((item) => {
          return (
            <div
              className="product-responsive--container"
              key={item.product._id}
            >
              <div className="image--container">
                <picture>
                  <img src={item.product.image} alt="product_image" />
                </picture>
              </div>
              <div className="description--container">
                <p>{item.product.name}</p>
                <p>${item.product.price}</p>
                <div className="quantity_responsive--container">
                  <p className="quantity">{item.quantity}</p>
                  <div className="quantity_button--container">
                    <button
                      className="btn-responsive btn-quantity"
                      onClick={() =>
                        handleModifyQuantity(item.product._id, "sum")
                      }
                      type="button"
                    >
                      <span className="material-icons">arrow_drop_up</span>
                    </button>
                    <button
                      className="btn-responsive btn-quantity"
                      onClick={() =>
                        handleModifyQuantity(item.product._id, "sub")
                      }
                      type="button"
                    >
                      <span className="material-icons">arrow_drop_down</span>
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-danger btn-responsive"
                  onClick={() => handleRemoveProduct(item.product._id)}
                  type="button"
                >
                  ELIMINAR
                </button>
              </div>
              <div className="total--responsive--container">
                <p>Total: ${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>
      {products.length !== 0 ? (
        <div className="checkout--container">
          <div className="total--container">
            <h2>Total: ${total}</h2>
          </div>
          <div className="checkout-button--container">
            <button
              onClick={handleCheckout}
              className="btn btn-primary"
              type="button"
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Cart;
