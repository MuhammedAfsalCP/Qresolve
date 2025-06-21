import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const createTicket = createAsyncThunk(
    "ticket/createTicket",
    async (ticketData,{rejectWithValue}) => {
        try {
            const response = await axios.post("http://localhost:8000/tickets/create", ticketData);
            return response.data;
        }catch (error){
            return rejectWithValue(error.response?.data || "server Error");
        }
    }
);


const ticketSlice = createSlice({
    name: "ticket",
    initialState:{
        tickets:[],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.push(action.payload);
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
});

export default ticketSlice.reducer;