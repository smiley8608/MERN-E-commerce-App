
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    sidebarShow: false,
    sidebarUnfoldable: false
}
const headerSlice=createSlice({
    name:'header',
    initialState:initialState,
    reducers:{
        sidebarToggle: (state) => {
            state.sidebarShow = !state.sidebarShow
        },
        sidebarUnfoldableToggle: (state) => {
            state.sidebarUnfoldable = !state.sidebarUnfoldable
        },
}})

export const {sidebarToggle,sidebarUnfoldableToggle} =headerSlice.actions
export default headerSlice.reducer