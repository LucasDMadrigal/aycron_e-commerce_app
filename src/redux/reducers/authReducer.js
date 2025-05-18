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
      console.log("🚀 ~ builder.addCase ~ action:", action);
      const newState = {
        ...state,
        user: {
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
          userId: action.payload.userId,
          isAdmin: action.payload.isAdmin,
          iat: action.payload.iat,
          exp: action.payload.exp,
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
      return initialState;
    });
});

export default authReducer;
