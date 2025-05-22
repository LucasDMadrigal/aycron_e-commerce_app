import { createAction } from "@reduxjs/toolkit";

export const addToCart = createAction("ADD_TO_CART");
export const removeFromCart = createAction("REMOVE_FROM_CART");
export const updateCart = createAction("UPDATE_CART");
export const setCartFromLocalStorage = createAction(
  "SET_CART_FROM_LOCALSTORAGE"
);
