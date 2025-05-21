import { createAction } from "@reduxjs/toolkit";

export const addToCart = createAction("ADD_TO_CART", (product) => {
    console.log("🚀 ~ addToCart ~ product:", product)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", cart);

    return { payload: cart }
});

export const removeFromCart = createAction("REMOVE_FROM_CART", (product) => {
// console.log("🚀 ~ removeFromCart ~ product:", product)

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const newCart = cart.filter(item => item._id !== product._id);
    localStorage.setItem("cart", newCart);

    return { payload: newCart }
})

export const updateCart = createAction("UPDATE_CART", (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const newCart = cart.map(item => item._id === product._id ? product : item);
    localStorage.setItem("cart", newCart);

    return { payload: newCart }
})

export const setCartFromLocalStorage = createAction("SET_CART_FROM_LOCALSTORAGE");