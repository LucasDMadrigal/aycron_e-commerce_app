import { createReducer } from "@reduxjs/toolkit";
import {
  addToCart,
  removeFromCart,
  setCartFromLocalStorage,
} from "../actions/cartActions";

const storedCart = localStorage.getItem("cart") || [];

const initialState = [...storedCart];

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      const newCart = [...action.payload];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    })
    .addCase(removeFromCart, (state, action) => {
      const newCart = [...action.payload];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    })
    .addCase(setCartFromLocalStorage, () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length > 0) {
        const setedCart = [...cart];
        return setedCart;
      } else {
        return [];
      }
    });
});

export default cartReducer;
