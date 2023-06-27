import { createSlice } from "@reduxjs/toolkit";
const initialstate={
    token:localStorage.getItem("studynotiontoken")?JSON.parse(localStorage.getItem("studynotiontoken")):null
}
export const  authslice=createSlice({
   name:"auth",
   initialState:initialstate,
   reducers:{
    set_token:(state,action)=>{
        state.token=action.payload;
        setTimeout(() => {
            localStorage.clear();
        },24*60*60*1000);
    }
   }
})

export const {set_token} = authslice.actions;
export default authslice.reducer;


