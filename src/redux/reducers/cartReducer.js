// 📁 redux/reducers/cartReducer.js
import { createReducer } from "@reduxjs/toolkit";
import { setCart } from "../actions/cartActions";

const initialState = [];

const cartReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCart, (_, action) => {
    localStorage.setItem("cart", JSON.stringify(action.payload));
    return action.payload;
  });
});

export default cartReducer;