// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./reducers/authReducer";
// import cartReducer from "./reducers/cartReducer";

// // Leer el estado persistido del localStorage
// const persistedCart = JSON.parse(localStorage.getItem("cart")) || [];

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     cart: cartReducer,
//   },
//   preloadedState: {
//     cart: persistedCart,
//   },
// });

// // Guardar en localStorage cada vez que cambia el cart
// store.subscribe(() => {
//   const state = store.getState();
//   localStorage.setItem("cart", JSON.stringify(state.cart));
// });

// export { store };

// 📁 redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
// import { fetchCartFromServer } from "./actions/cartActions";

// const token = localStorage.getItem("token");
// const persistedCart = fetchCartFromServer(token) || [];
const persistedCart = JSON.parse(localStorage.getItem("cart")) || [];
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: persistedCart,
  },
});

// Guardar en localStorage cada vez que cambia el cart
// store.subscribe(() => {
//   const state = store.getState();
//   localStorage.setItem("cart", JSON.stringify(state.cart));
// });

export { store };
