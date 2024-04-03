import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/products/productSlice";
import apiSlice from "./apiSlice";
import authSliceReducer from "../features/auth/authSlice";



const store=configureStore({
      reducer:{
            auth:authSliceReducer,
            [apiSlice.reducerPath]:apiSlice.reducer
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
      devTools:true
})
export default store