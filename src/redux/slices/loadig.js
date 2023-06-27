import { createSlice } from "@reduxjs/toolkit";
export const initialState={
    loading:false
}
export const loadingslice=createSlice({
  name:"loading",
  initialState,
  reducers:{
    setloading:(state,action)=>{
        state.loading=action.payload;
    }
  }
})

export const {setloading}=loadingslice.actions;
export default loadingslice.reducer;