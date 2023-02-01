
import mongoose, { Mongoose } from "mongoose";
import { addressSchema, cartSchema, crudSchema } from "./crudmodel";
import { productSchema } from "./productModel";

const paymentSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    }, to: {
        type: String,
        required: true
    }, hash: {
        type: String,
        required: true
    }, amount: {
        type: Number,
        required: true
    }
})

const orderSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    }, product: 
        {
            type: [cartSchema],
            required:true
        }
    , address: {
        type: addressSchema,
        required:true
    }, paymentDetails: {
        type: paymentSchema,
        default: true
    },
    user: {
        type:mongoose.Types.ObjectId,
        required:true
    },deliverIn:{
        type:String,
        required:true
    },deliverStatus:{
        type:String,
        require:true
    }
})

const OrderModel= mongoose.model('Order',orderSchema)

export default OrderModel