import { createSlice } from "@reduxjs/toolkit";

const initialState={TogglebBtn:false,themeClass:"Default-theme"}

const ThemeSlice=createSlice({
    name:"Theme",
    initialState:initialState,
    reducers:{
        ChangeTheme(state,action){
            state.themeClass=action.payload
            state.TogglebBtn=!!state.TogglebBtn
        }
    }
})

export const ThemeAction=ThemeSlice.actions
export default ThemeSlice.reducer