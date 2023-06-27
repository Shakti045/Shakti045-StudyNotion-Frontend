import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user:localStorage.getItem("studynotionuser")?JSON.parse(localStorage.getItem("studynotionuser")):null
}

export const userslice=createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        set_user:(state,action)=>{
            state.user=action.payload;
            localStorage.setItem("studynotionuser",JSON.stringify(action.payload));
        }
    }
})

export const {set_user}=userslice.actions;
export default userslice.reducer;