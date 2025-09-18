import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice.js'
import booleanSlice from './features/booleanSlice.js'

const store = configureStore({
    reducer: {
        authSlice : authSlice,
        booleanSlice,
    },
})

export default store