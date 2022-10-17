import axios from "axios";
import React from "react";

import { useAppSelector } from "../redux/hook";

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

