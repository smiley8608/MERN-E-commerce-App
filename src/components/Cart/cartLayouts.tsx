import { Button } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { setRefreshCart } from "../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { Card } from "./card";

export const CartLayouts = () => {

    let cart:CartItem[];
    
    // const cart = useAppState(state => state.cart.cart)
    const auth = useAppSelector(state => state.User.Auth)
    const authcart = useAppSelector(state => state.User.User?.cart)
    const nonauthcart = useAppSelector(state => state.Cart.cart)
    if(auth){
        cart = authcart as CartItem[]
    } else {
        cart = nonauthcart
    }
    const user = useAppSelector(state => state.User.User)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(auth && user?.cart){
            dispatch(setRefreshCart([]))
        }
    },[auth, dispatch, user?.cart])
    localStorage.removeItem("entryurl")
    

    return (
        <div className='tw-w-full'>
            <div className='tw-px-3 tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-2 md:tw-gap-3 lg:tw-gap-4'>
                {cart?.length as number > 0 ? <>
                    {cart?.map(cartItem => <Card key={cartItem.product._id} product={cartItem.product} quantity={cartItem.quantity} />)}
                </> : <h1>No Products Found</h1>}
            </div>
            <div className='tw-w-full tw-mt-5'>
                {cart?.length > 0 && auth ? 
                <Link to={"/u/checkout"}><Button type='ghost' className='tw-bg-teal-500 tw-w-10/12 tw-mx-auto tw-flex tw-flex-col tw-items-stretch tw-rounded-md'>Proceed to Check-out</Button></Link>:
                <Link to={"/signin"}><Button type='ghost' className='tw-bg-amber-500 tw-w-10/12 tw-mx-auto tw-flex tw-flex-col tw-items-stretch tw-rounded-md' >SignIn to Check-out</Button></Link>}
            </div>
        </div>
    )
}

