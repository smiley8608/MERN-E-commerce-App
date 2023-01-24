
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
    
    
    const {checkout,cart,payable,hash}=req.body
    console.log(cart);
    
    if(hash===''){
        return res.json({message:"unable to find the hash"})
    }else{
        OrderModel.create({amount:payable,product:cart,address:checkout,paymentDetails:hash,user:req.user._id,deliverIn:'7'})
        .then(responce=>{
            
            return res.json({message:"Transaction Completed succssfully !"})
            
        })
        .catch(error=>{
            console.log(error);
        })
        
        
    }
}

export const getTransaction =(req:express.Request,res:express.Response)=>{

    OrderModel.find({})
    .then(responce=>{
        if(responce.length>=1){
            return res.json({result:responce})
        }else{
            return res.json({message:'no transactin had yet made'})
        }
    }).catch(error=>{
        console.log(error);
        
    })
}