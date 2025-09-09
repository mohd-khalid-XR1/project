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
            // console.log(action.payload);
            state.userData = action.payload.user
        //    console.log(state.isAuthenticated);
        //    console.log(state.userData);
        },
        logoutReducer : (state,action)=>{
            state.isAuthenticated = false
            state.userData = null
        }
    }
})

export const { signup, logoutReducer } = authSlice.actions
export default authSlice.reducer