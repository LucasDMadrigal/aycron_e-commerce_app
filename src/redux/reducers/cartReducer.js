import { createReducer } from "@reduxjs/toolkit";
import {
  addToCart,
  removeFromCart,
  updateCart,
  setCartFromLocalStorage,
} from "../actions/cartActions";

// Estado inicial como array de productos
const initialState = [];

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      return [...state, action.payload];
    })
    .addCase(removeFromCart, (state, action) => {
      return state.filter((item) => item._id !== action.payload._id);
    })
    .addCase(updateCart, (state, action) => {
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    })
    .addCase(setCartFromLocalStorage, (_, action) => {
      return action.payload;
    });
});

export default cartReducer;
