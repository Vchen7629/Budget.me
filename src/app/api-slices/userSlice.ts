import { createSlice } from "@reduxjs/toolkit";
import { username } from "./types/types";


const authSlice = createSlice({
    name: "auth",
    initialState: { username: null }, 
    reducers: {
        setCredentials: (state, action) => {
            const { username } = action.payload
            state.username = username
        },

        logOut: (state) => {
            state.username = null
        },
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentusername = (state: username) => state.auth.username


