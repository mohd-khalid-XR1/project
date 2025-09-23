import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileData : null
}

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState: initialState,
    reducers: {
        setProfileReducer : (state,action)=>{
            state.profileData = action.payload.profileData
        }
    }
})

export const { setProfileReducer } = profileSlice.actions
export default profileSlice.reducer