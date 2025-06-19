import { createSlice } from '@reduxjs/toolkit'

const initialState={
    is_Dark:false
    
}
const DarkSlice = createSlice({
    name: "Dark",
   initialState,
    reducers: {
        SetDark: (state) => {
            state.is_Dark=!state.is_Dark
        }
    }
})

export default DarkSlice.reducer

export const {SetDark}= DarkSlice.actions