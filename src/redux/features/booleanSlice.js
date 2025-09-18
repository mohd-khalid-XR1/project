import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    popupState: {
        success: false,
        message: ""
    },

}

const booleanSlice = createSlice({
    name: "booleanSlice",
    initialState,
    reducers: {
        popupSuccessReducer: (state, action) => {
            console.log(action.payload);
            const object = action.payload.popupState
            state.popupState.success = true
            state.popupState.message = object.message
        },
        popupFailedReducer: (state, action) => {
            const object = action.payload.popupState
            state.popupState.success = false
            state.popupState.message = object.message
        },
        popupEmptyReducer: (state) => {
            state.popupState.success = false
            state.popupState.message = ""
        }
    }
})

export const { popupFailedReducer, popupSuccessReducer, popupEmptyReducer } = booleanSlice.actions
export default booleanSlice.reducer