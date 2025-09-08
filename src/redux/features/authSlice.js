import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        signup: (state,action) => {
            state.isAuthenticated = true
            console.log(action.payload);
            state.userData = action.payload
        //    console.log(state.isAuthenticated);
        //    console.log(state.userData);
        }
    }
})

export const { signup } = authSlice.actions
export default authSlice.reducer