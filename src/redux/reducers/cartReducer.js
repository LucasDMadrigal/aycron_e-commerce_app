import { createReducer } from "@reduxjs/toolkit";
import {
  addToCart,
  removeFromCart,
  setCartFromLocalStorage,
} from "../actions/cartActions";

const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = [...storedCart];

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      const newState = [...state, action.payload];
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    })
    .addCase(removeFromCart, (state, action) =>
      state.filter((item) => item._id !== action.payload._id)
    )
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
