
import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState={
    sidebarShow: false,
    sidebarUnfoldable: false,
    modifer:{
        sortby:'relevance',
        rangestart:0,
        rangeend:50000,
        category:[] as string[],
        search:''

    }
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
        setModifier:(state,action:PayloadAction<any>)=>{
            state.modifer={...state.modifer,...action.payload}
        }
}})

export const {sidebarToggle,sidebarUnfoldableToggle,setModifier} =headerSlice.actions
export default headerSlice.reducer