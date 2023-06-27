import { createSlice } from "@reduxjs/toolkit";
const initialState={
    videourl:null
}

export const videoslice=createSlice({
    name:"Video",
    initialState,
    reducers:{
        set_video:(state,action)=>{
            state.videourl=action.payload;
        }
    }
})

export  const {set_video} =videoslice.actions;
export default videoslice.reducer;