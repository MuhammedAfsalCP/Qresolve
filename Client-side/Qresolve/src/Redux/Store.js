import { configureStore } from "@reduxjs/toolkit";
import DarkReducer from './Slices/Darkslice';


const Store=configureStore({
    reducer:{
        dark:DarkReducer,
    }
})

export default Store