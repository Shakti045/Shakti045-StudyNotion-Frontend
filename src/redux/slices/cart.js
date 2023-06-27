import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState={
    cartitems:localStorage.getItem("studynotioncartitem")?JSON.parse(localStorage.getItem("studynotioncartitem")):[]
}

export const cartslice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
     addto_cart:(state,action)=>{
        state.cartitems.push(action.payload);
        localStorage.setItem("studynotioncartitem",JSON.stringify(state.cartitems))
        toast.success("Added To Cart")
     },
     removefrom_cart:(state,action)=>{
        const index = state.cartitems.findIndex((item) => item._id === action.payload)
        state.cartitems.splice(index, 1)
        localStorage.setItem("studynotioncartitem",JSON.stringify(state.cartitems))
        toast.success("Removed From Cart")
     },
    reset_cart:(state,action)=>{
        state.cartitems=[];
        localStorage.removeItem("studynotioncartitem");
    },
}
})

export const {addto_cart,removefrom_cart,reset_cart}=cartslice.actions;
export default cartslice.reducer;