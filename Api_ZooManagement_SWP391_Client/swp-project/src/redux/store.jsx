import { configureStore } from "@reduxjs/toolkit";
import shoppingSlice from "./slices/shoppingCart"
export default configureStore({
    reducer:{
        shopping:shoppingSlice,
    }
})