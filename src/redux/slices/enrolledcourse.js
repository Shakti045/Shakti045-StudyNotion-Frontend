import { createSlice } from "@reduxjs/toolkit";
const initialState={
  currentcouredata:null,
  completedvideos:[],
  totalvideos:0
}
export const enrolledcourseslice=createSlice({
    name:"enrolledcourse",
    initialState,
    reducers:{
        set_currentcoursedata:(state,action)=>{
            state.currentcouredata=action.payload
        },
        set_completedvideos:(state,action)=>{
            state.completedvideos=action.payload
        },
        set_totalvideos:(state,action)=>{
            state.totalvideos=action.payload;
        }
    }
})

export const {set_currentcoursedata,set_completedvideos,set_totalvideos}=enrolledcourseslice.actions;
export default enrolledcourseslice.reducer;