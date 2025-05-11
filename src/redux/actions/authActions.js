import { createAction } from "@reduxjs/toolkit";

export const login = createAction('LOGIN', (user) => {

    const clearUser = {
        name: user.name,
        lastName: user.lastName,
    }

    return {payload: {
        clearUser,
    }}
})