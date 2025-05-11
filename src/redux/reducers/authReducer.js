import { createReducer } from '@reduxjs/toolkit'
import { login } from '../actions/authActions'

const initialState = {
    loggedIn: false,
    token:"",
    expiresIn: 0,
    user: {
        name: "",
        lastName: "",
        email: "",
    }

}

const authReducer = createReducer(initialState, (builder) => {
    builder.addCase(login, (state, action) => {
        return {
            ...state,
            loggedIn: true,
            token: action.payload.token,
            expiresIn: action.payload.expiresIn,
            user: action.payload.user
        }

    })
})

export default authReducer