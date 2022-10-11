
import express =require('express')
import { productmodel } from '../model/productModel'

export const storeController=(req:express.Request,res:express.Response)=>{
    productmodel.find({})
    .then(result=>{
        return res.json({message:'New Arrival',Result:result})
    })
    .catch(err=>{
        return res.json({message:err.message})
    })

}