import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authslice } from "../slices/auth";
import { userslice } from "../slices/user";
import { cartslice } from "../slices/cart";
import { loadingslice } from "../slices/loadig";
import { wishlistslice } from "../slices/wishlist";
import { videoslice } from "../slices/video";
import { courseslice } from "../slices/course";


const rootreducer=combineReducers({
    auth:authslice.reducer,
    user:userslice.reducer,
    cart:cartslice.reducer,
    loading:loadingslice.reducer,
    wishlist:wishlistslice.reducer,
    video:videoslice.reducer,
    course:courseslice.reducer
})

const store=configureStore({
    reducer:rootreducer
})

export default store;