import { createSlice } from '@reduxjs/toolkit'

const initialState={
    is_Dark: JSON.parse(localStorage.getItem("theme")) ?? false
    
}
const DarkSlice = createSlice({
    name: "Dark",
   initialState,
    reducers: {
        SetDark: (state) => {
            state.is_Dark=!state.is_Dark
            localStorage.setItem("theme", JSON.stringify(state.is_Dark));
        }
    }
})

export default DarkSlice.reducer

export const {SetDark}= DarkSlice.actions