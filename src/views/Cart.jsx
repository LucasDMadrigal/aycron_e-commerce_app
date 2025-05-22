import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  setCartFromLocalStorage,
  updateCart,
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

  useEffect(() => {
    dispatch(setCartFromLocalStorage());
  }, []);

  useEffect(() => {
    // Cuando el cart se actualiza en Redux, actualizá el estado local
    const cartWithQuantity = cart.map((prod) => ({
      ...prod,
      quantity: prod.quantity ?? 1, // Si ya viene con quantity no lo pisa
    }));
    const total = cartWithQuantity.reduce(
      (acc, prod) => acc + prod.price * prod.quantity,
      0
    );
    setTotal(total.toFixed(2));
    setProducts(cartWithQuantity);
  }, [cart]);

  const handleModifyQuantity = (prodId, action) => {
    console.log("🚀 ~ handleModifyQuantity ~ prodId:", prodId);
    const updatedProducts = products.map((prod) => {
      if (prod._id === prodId) {
        const newQuantity =
          action === "sum"
            ? Math.min(prod.quantity + 1, prod.stock)
            : Math.max(prod.quantity - 1, 1);
        return { ...prod, quantity: newQuantity };
      }
      return prod;
    });

    dispatch(updateCart(updatedProducts.find((prod) => prod._id === prodId)));

    setProducts(updatedProducts); // Actualizás el state local con la copia modificada
  };

  const handleRemoveProduct = (prodId) => {
    const updatedProducts = products.filter((prod) => prod._id !== prodId);
    dispatch(removeFromCart({ _id: prodId }));
    setProducts(updatedProducts);
  };

  const handleCheckout = () => {
    if (window.confirm("Are you sure you want to checkout?")) {
      axios
        .post(`${import.meta.env.VITE_API_URL}purchase/create`, {
          products, user_id: userId
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
        //  navigate("/purchases");
        navigate("/auth/store");
        });
    }
  };
  return (
    <>
      <h1>Cart</h1>
      {products.length === 0 ? (
        <h2>Cart is empty</h2>
      ) : (
        <table>
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
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    <button
                      className="button--table"
                      onClick={() => handleModifyQuantity(product._id, "sub")}
                      type="button"
                    >
                      -
                    </button>
                    {product.quantity}
                    <button
                      className="button--table"
                      onClick={() => handleModifyQuantity(product._id, "sum")}
                      type="button"
                    >
                      +
                    </button>

                  </td>
                  <td>${(product.price*product.quantity).toFixed(2)}</td>
                  <td className="actions">
                    <button
                      className="button--table"
                      onClick={() => handleRemoveProduct(product._id)}
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
