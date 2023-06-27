import { createSlice } from "@reduxjs/toolkit";
const initialState={
   step:1,
   coursedata:null,
   sectiondata:null,
   editmode:false,
   sectioneditmode:false,
   loading:false,
   showsubsectionform:false,
   subsectioneditmode:false,
   subsectiondata:null
}

export const courseslice=createSlice({
    name:"Course",
    initialState,
    reducers:{
        set_step:(state,action)=>{
            state.step=action.payload
        },
        set_coursedata:(state,action)=>{
            state.coursedata=action.payload
        },
        set_sectiondata:(state,action)=>{
            state.sectiondata=action.payload
        },
        set_editmode:(state,action)=>{
           state.editmode=action.payload
        },
        set_loading:(state,action)=>{
            state.loading=action.payload
        },
        set_sectiononeditmode:(state,action)=>{
            state.sectioneditmode=action.payload
        },
        set_showsubsectionform:(state,action)=>{
            state.showsubsectionform=action.payload;
        },
        set_subsectioneditmode:(state,action)=>{
            state.subsectioneditmode=action.payload
        },
        set_subsectiondata:(state,action)=>{
            state.subsectiondata=action.payload;
        }
    }
})

export const {set_coursedata,set_loading,set_sectiondata,set_step,set_editmode,set_sectiononeditmode,set_showsubsectionform,set_subsectioneditmode,set_subsectiondata}=courseslice.actions;
export default courseslice.reducer;