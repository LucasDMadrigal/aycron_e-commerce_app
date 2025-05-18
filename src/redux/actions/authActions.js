import { createAction } from "@reduxjs/toolkit";

export const login = createAction("LOGIN", (user) => {
  const clearUser = {
    first_name: user.first_name,
    last_name: user.last_name,
    userId: user.userId,
    isAdmin:user.isAdmin,
    iat:user.iat,
    exp:user.exp,
    token: user.token,
  };

  return { payload: clearUser };
});

export const logout = createAction('LOGOUT') 