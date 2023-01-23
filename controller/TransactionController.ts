
import express from 'express'
import dotenv from 'dotenv'
import OrderModel from '../model/orderModel'
import { updatedRequest } from '../Interface'
dotenv.config()
export const serverAddress=(req:express.Request,res:express.Response)=>{

if(process.env.Server_Address){
    return res.json({serverAddress:process.env.Server_Address})
}else{
    return ''
}
}

export const UpdatedTransaction=(req:updatedRequest,res:express.Response)=>{
    console.log(req.body);
    console.log('req.user',req.user);
    
    
    const {checkouts,cart,payable,hash}=req.body
    if(hash===''){
        return res.json({message:"unable to find the hash"})
    }else{
        OrderModel.create({amount:payable,product:cart[0],address:checkouts,paymentDetails:hash,user:req.user,deliverIn:'7'})
        .then(responce=>{
            
            console.log(responce);
            
        })
        .catch(error=>{
            console.log(error);
        })
        
        
    }
}