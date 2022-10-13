import { configureStore } from "@reduxjs/toolkit";
import headerSlice from './headerSlice'
import productSlice from "./productSlice";

import reduxSlice from './userSlice'
const store =configureStore({
    reducer:{
        User:reduxSlice,
        Slidbar:headerSlice,
        Product:productSlice
    }
})

export default store
export type RootState=ReturnType<typeof store.getState>
export type RootDispatch=typeof store.dispatch