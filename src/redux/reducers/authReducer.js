import { createReducer } from "@reduxjs/toolkit";
import { login } from "../actions/authActions";

const initialState = {
  user: {
    name: "",
    lastName: "",
    rol: "",
  },
  token: "",
  expiresIn: "",
  loggedIn: false,
};

const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(login, (state, action) => {
    const newState = {
      ...state,
      loggedIn: true,
      token: action.payload.token,
      expiresIn: action.payload.expiresIn,
      user: action.payload.user,
    };

    localStorage.setItem("user", JSON.stringify(newState));
    return newState;
  })
  .addCase('LOGOUT', () => {
    localStorage.removeItem('user');
    return initialState;
  })
});

export default authReducer;
