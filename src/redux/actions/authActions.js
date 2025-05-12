import { createAction } from "@reduxjs/toolkit";

export const login = createAction('LOGIN', (user) => {

    const clearUser = {
        name: user.name,
        lastName: user.lastName,
        token: user.token,
        expiresIn: user.expiresIn,
        loggedIn: true,
        rol: user.rol
    }

    return {payload: clearUser}
})