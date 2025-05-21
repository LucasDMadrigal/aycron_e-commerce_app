import React, { useEffect, useState } from "react";
import "./styles/Cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  setCartFromLocalStorage,
  updateCart,
} from "../redux/actions/cartActions";
import axios from "axios";
import { Navigate } from "react-router";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(setCartFromLocalStorage());
  }, []);

  useEffect(() => {
    // Cuando el cart se actualiza en Redux, actualizá el estado local
    const cartWithQuantity = cart.map((prod) => ({
      ...prod,
      quantity: prod.quantity ?? 1, // Si ya viene con quantity no lo pisa
    }));
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
                  <td>1</td>
                  <td>${product.price}</td>
                  <td className="actions">
                    <button
                    className="button--table"
                      onClick={() => handleModifyQuantity(product._id, "sum")}
                      type="button"
                    >
                      +
                    </button>
                    {product.quantity}
                    <button
                    className="button--table"
                      onClick={() => handleModifyQuantity(product._id, "sub")}
                      type="button"
                    >
                      -
                    </button>
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
    </>
  );
};

export default Cart;
