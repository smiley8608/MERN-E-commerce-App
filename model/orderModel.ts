
import mongoose from "mongoose";
import { addressSchema, crudSchema } from "./crudmodel";
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
    }, product: [
        {
            type: productSchema,
            default: []
        }
    ], address: [{
        type: addressSchema,
        default: []
    }], paymentDetails: {
        type: [paymentSchema],
        default: true
    },
    user: {
        type: [crudSchema],
        default: []
    },deliverIn:{
        type:String,
        required:true
    }
})

const OrderModel= mongoose.model('Order',orderSchema)

export default OrderModel