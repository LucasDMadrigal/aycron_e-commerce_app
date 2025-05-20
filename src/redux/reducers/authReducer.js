import { createReducer } from "@reduxjs/toolkit";
import { login, logout } from "../actions/authActions";

const storedUser = JSON.parse(localStorage.getItem("user")) || null;


const initialState = storedUser || {
  user: {
    first_name: "",
    last_name: "",
    userId: "",
    isAdmin: "",
    iat: "",
    exp: "",
  },
  token: "",
  expiresIn: "",
  loggedIn: false,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      const newState = {
        ...state,
        user: {
          first_name: action.payload.user.first_name,
          last_name: action.payload.user.last_name,
          userId: action.payload.user.userId,
          isAdmin: action.payload.user.isAdmin,
          iat: action.payload.user.iat,
          exp: action.payload.user.exp,
        },
        token: action.payload.token,
        expiresIn: action.payload.exp,
        loggedIn: true,
      };

      localStorage.setItem("user", JSON.stringify(newState));
      return newState;
    })
    .addCase(logout, () => {
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      return initialState;
    });
});

export default authReducer;
