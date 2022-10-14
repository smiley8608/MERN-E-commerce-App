import { createSlice } from "@reduxjs/toolkit";

interface initialStateprops {
    cart:CartItem[]
}
const initialState:initialStateprops ={
    cart:[]
}
const CartSlice=createSlice({
    name:'cartproduct',
    initialState:initialState,
    reducers:{
        setInitialCart:(state:initialStateprops,action)=>{
            state.cart=action.payload
        },
        setCartReplace:(state,action)=>{
            state.cart=action.payload
        },
        setRefreshCart:(state,action)=>{
            state.cart=action.payload
        }
    }
})

export const {setInitialCart,setCartReplace,setRefreshCart}=CartSlice.actions
export default CartSlice.reducer