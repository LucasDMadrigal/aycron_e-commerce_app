import { createAction } from "@reduxjs/toolkit";

export const login = createAction("LOGIN", (auth) => {
  const clearAuth = {
    user: {
          first_name: auth.user.first_name,
          last_name: auth.user.last_name,
          userId: auth.user.userId,
          isAdmin: auth.user.isAdmin,
          iat: auth.user.iat,
          exp: auth.user.exp,
        },
        token: auth.token,
        expiresIn: auth.exp,
  };

  return { payload: clearAuth };
});

export const logout = createAction('LOGOUT') 