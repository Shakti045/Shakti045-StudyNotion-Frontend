import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
const initialState={
    wishlistitems:localStorage.getItem("studynotionwishlist")?JSON.parse(localStorage.getItem("studynotionwishlist")):[]
}

export const wishlistslice=createSlice({
    name:"Wishlist",
    initialState,
    reducers:{
        add_to_wishlist:(state,action)=>{
            state.wishlistitems.push(action.payload);
            localStorage.setItem('studynotionwishlist',JSON.stringify(state.wishlistitems));
            toast.success("Item Added To WishList")
        },
        remove_from_wishlist:(state,action)=>{
            const index=state.wishlistitems.findIndex((item)=>item?._id!==action.payload);
            state.wishlistitems.splice(index,1);
            localStorage.setItem('studynotionwishlist',JSON.stringify(state.wishlistitems));
            toast.success("Item Removed From WishList")
        }
    }
})

export const {add_to_wishlist,remove_from_wishlist}= wishlistslice.actions;
export default wishlistslice.reducer;