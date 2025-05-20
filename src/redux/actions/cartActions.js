import { createAction } from "@reduxjs/toolkit";

export const addToCart = createAction("ADD_TO_CART", (product) => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    return { payload: cart }
});

export const removeFromCart = createAction("REMOVE_FROM_CART", (product) => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const newCart = cart.filter(item => item._id !== product._id);
    localStorage.setItem("cart", JSON.stringify(newCart));

    return { payload: cart }
})

export const setCartFromLocalStorage = createAction("SET_CART_FROM_LOCALSTORAGE");