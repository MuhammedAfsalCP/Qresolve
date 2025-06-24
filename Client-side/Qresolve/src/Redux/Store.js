import { configureStore } from "@reduxjs/toolkit";
import DarkReducer from './Slices/Darkslice';
// import ticketReducer from './Slices/ticketSlice';


const Store=configureStore({
    reducer:{
        dark:DarkReducer,
        // ticket: ticketReducer,
    }
})

export default Store