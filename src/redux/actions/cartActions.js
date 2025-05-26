
import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

export const setCart = createAction("SET_CART");

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchCartFromServer = (token) => async (dispatch) => {
  try {
    const res = await axios.get(`${VITE_API_URL}carts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setCart(res.data.products));
    localStorage.setItem("cart", JSON.stringify(res.data.products));
  } catch (err) {
    console.error("Error al obtener el carrito:", err);
  }
};

export const addItemToCartOnServer =
  (productId, quantity, userId, token) => async (dispatch) => {
    try {
  
      const res = await axios.post(
        `${VITE_API_URL}carts`,
        { productId, quantity, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setCart(res.data.products));
    } catch (err) {
      console.error("Error al agregar producto al carrito:", err);
    }
  };
export const updateCartItemQuantity =
  (productId, quantity, userId, token) => async (dispatch) => {
    try {
  
      const res = await axios.patch(
        `${VITE_API_URL}carts/${productId}`,
        { quantity, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setCart(res.data));
    } catch (err) {
      console.error("Error al actualizar cantidad del producto:", err);
    }
  };

export const removeItemFromCart = (productId, token) => async (dispatch) => {
  try {

    const res = await axios.delete(`${VITE_API_URL}carts/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setCart(res.data));
  } catch (err) {
    console.error("Error al eliminar producto del carrito:", err);
  }
};

export const clearCartState = createAction("CLEAR_CART");
