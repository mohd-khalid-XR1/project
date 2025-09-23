import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice.js'
import booleanSlice from './features/booleanSlice.js'
import profileSlice from './features/profileSlice.js'

const store = configureStore({
    reducer: {
        authSlice : authSlice,
        booleanSlice,
        profileSlice,
    },
})

export default store