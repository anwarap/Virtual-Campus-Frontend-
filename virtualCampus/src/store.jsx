import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice';
import modalReducer from './slice/modelSlice';
 

 const store =configureStore({
    reducer:{
        auth: authReducer,
        modal:modalReducer
    }
 })


 export default store;