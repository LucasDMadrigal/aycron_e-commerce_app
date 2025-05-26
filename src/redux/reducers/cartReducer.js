// 📁 redux/reducers/cartReducer.js
import { createReducer } from "@reduxjs/toolkit";
import { clearCartState, setCart } from "../actions/cartActions";

const initialState = [];

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCart, (_, action) => {
      localStorage.setItem("cart", JSON.stringify(action.payload));
      return action.payload;
    })
    .addCase(clearCartState, () => {
      localStorage.removeItem("cart");
      return [];
    });
});

export default cartReducer;
