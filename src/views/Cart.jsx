import React, { useEffect, useState } from "react";
import "./styles/Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { setCartFromLocalStorage } from "../redux/actions/cartActions";
import axios from "axios";
const Cart = () => {

  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const token = useSelector((state) => state.auth.token);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    dispatch(setCartFromLocalStorage());
  }, []);
  
  useEffect(() => {
    cart.forEach((id) => {
      axios.get(`${apiUrl}products/get/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        products.push(response.data.payload)
        console.log("product", products);
      });
  
    });
  }, [cart]);

  return (
    <>
      <h1>Cart</h1>
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
          <tr>
            <td>Product 1</td>
            <td>$10</td>
            <td>2</td>
            <td>$20</td>
            <td>+ 1 - &</td>
          </tr>
          <tr>
            <td>Product 2</td>
            <td>$20</td>
            <td>1</td>
            <td>$20</td>
            <td>+ 1 - &</td>
          </tr>
          {cart.map((product) => {
            return (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>1</td>
                <td>${product.price}</td>
                <td>+ 1 - &</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Cart;
