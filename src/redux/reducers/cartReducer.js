import { createReducer } from "@reduxjs/toolkit";
import {
  addToCart,
  removeFromCart,
  setCartFromLocalStorage,
} from "../actions/cartActions";

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const initialState = [...cart];

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
      
        const setedCart = [...cart];
        return setedCart;
    });
});

export default cartReducer;
