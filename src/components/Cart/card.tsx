
import { Star } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { Button, Statistic } from "antd";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { setCartReplace } from "../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setReplaceCart } from "../redux/userSlice";

interface cardprops {
  product:Product,
  quantity:number
}


export const addToCart = async (product: Product, auth: boolean, cart: CartItem[]) => {
  let check = cart?.filter(
    (value) => String(value.product._id) === String(product._id)
  );

  if (check.length > 0) {
    const index = cart.findIndex((item) => item.product._id === product._id);
    const matchedFilter = cart.filter((item) => {
      return item.product._id === product._id;
    });
    const misMatchedFilters = cart.filter(
      (item) => item.product._id !== product._id
    );

    const newCart = [...misMatchedFilters];
    newCart.splice(index, 0, {
      ...matchedFilter[0],
      quantity: matchedFilter[0].quantity + 1,
    });
    if (auth) {
      let promise = axios.post("http://localhost:4000/cart", { cart: newCart });

      try {
        localStorage.removeItem("cart");
        return (await promise).data.cart;
      } catch (err) {
        console.log(err);
      }
    }
    localStorage.setItem('cart',JSON.stringify(newCart))
    return newCart
  }else if(cart.length>1){
    cart=[...cart,{product:product,quantity:1}]

  }else{
    cart=[{product:product,quantity:1}]
  }
  localStorage.setItem('cart',JSON.stringify(cart))

  const promice=axios.post('http://localhost:4000/cart',{cart:cart})
  try {
    localStorage.removeItem('cart')
    return (await promice).data.cart
  } catch (err) {
    console.log(err);
    
  }
  return cart
};


export const removeFromCart= async(product:Product,auth:boolean,cart:CartItem[])=>{

    const chechItem=cart.filter(value=>{
       return String(value.product._id)===String(product._id)
    })
    if(chechItem.length>0){
        let itemIndex=cart.findIndex(item=>item.product._id===product._id)
        let matchedItems=cart.filter(item=>item.product._id===product._id)
        let mismatchedItems=cart.filter(item=>item.product._id != product._id)

        let newcart=[...mismatchedItems]
        newcart.splice(itemIndex,0,{...matchedItems[0],quantity:matchedItems[0].quantity-1})
        if(auth){
            const promise=axios.post('http://localhost:4000/cart',{cart:newcart})
            try {
                localStorage.removeItem('cart')
                return ( await promise).data.cart
            } catch (err) {
                console.log(err);
                
            }
        }
        localStorage.setItem('cart',JSON.stringify(newcart))
        return newcart
    }else if(cart.length>1){
        cart=[...cart,{product:product,quantity:-1}]
    }else {
        cart=[...cart,{product:product,quantity:-1}]
    }
    if(auth){
      let filterValue=cart.filter(value=> value.quantity <=0)
       if(filterValue.length>0){
        return await deletecart(filterValue[0].product,auth,cart)
       }
        const promise=axios.post('http://localhost:4000/cart',{cart:cart})
        try {
            localStorage.removeItem('cart')
            return (await promise).data.cart
        } catch (err) {
            console.log(err);
            
        }
    }
    return cart

}

export const deletecart=async (product:Product,auth:boolean,cart:CartItem[])=>{
  
  const check=cart.filter(value=>value.product._id !== product._id)
  let newcart=[...check]
  localStorage.setItem('cart',JSON.stringify(newcart))
    if(auth){
     const promise= axios.delete('http://localhost:4000/deletecart')
     try {
      localStorage.removeItem('cart')
      return (await promise).data.cart
     } catch (err) {
      console.log(err);
      
     }
    }
    return newcart
}
export const Card=({product,quantity}:cardprops):any=>{

  const cart=useAppSelector(state=>state.Cart.cart)
  const auth=useAppSelector(state => state.User.Auth)
  const dispatch=useAppDispatch()
  
  return(
    <div className='tw-rounded-sm md:tw-rounded-md tw-flex tw-flex-col tw-shadow-xl tw-bg-white tw-shadow-gray-300 tw-cursor-pointer' >
    <Link to={"/details/" + product._id} className='tw-w-full tw-bg-center tw-bg-contain tw-bg-no-repeat tw-rounded-t-sm md:tw-rounded-t-md' style={{ height: "300px", backgroundImage: `url(${product.thumbnail})` }}></Link>
    <div className='tw-p-3 tw-bg-white tw-rounded-b-sm md:tw-rounded-b-md'>
      <p className='tw-mb-0 tw-text-xl tw-font-semibold tw-text-gray-700 tw-h-14 tw-overflow-hidden'>{product.title}</p>
      <div className='tw-mb-0 tw-my-1 tw-text-xl tw-text-gray-700 tw-flex tw-items-center'>Price: <span className='tw-text-xl tw-font-semibold tw-text-pink-600 tw-flex tw-items-center'>$<Statistic value={product.price} /></span></div>
      <Rating readOnly emptyIcon={<Star />} value={product.rating} precision={0.5} />
      <br />
      <div className='tw-flex tw-gap-x-3 tw-items-center tw-text-lg'><span>Quantity:</span><div className='tw-flex tw-items-center'>{quantity}</div> </div>
      
      
      <Button type='primary' className='tw-w-full' onClick={async () => {  
        let resultCart = await addToCart(product, auth, cart as CartItem[])
        dispatch(setCartReplace(resultCart as unknown as CartItem[]))
        dispatch(setReplaceCart(resultCart as unknown as CartItem[]))
      }}>Increase Quantity</Button>


      <Button type='primary' className='tw-w-full tw-bg-amber-400 tw-border-amber-400 tw-mt-2' onClick={async () => {
        let resultCart = await removeFromCart(product, auth, cart as CartItem[])
        dispatch(setCartReplace(resultCart as unknown as CartItem[]))
        dispatch(setReplaceCart(resultCart as unknown as CartItem[]))
      }}>Decrease Quantity</Button>


      <Button type='primary' className='tw-w-full tw-bg-rose-500 tw-border-rose-500 tw-mt-2' onClick={async () => {
        let resultCart = await deletecart(product, auth, cart as CartItem[])
        dispatch(setCartReplace(resultCart as unknown as CartItem[]))
        dispatch(setReplaceCart(resultCart as unknown as CartItem[]))
      }}>Remove Product</Button>


    </div>
  </div>
  )
}