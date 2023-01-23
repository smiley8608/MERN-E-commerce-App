import mongoose from "mongoose";
import { productSchema } from "./productModel";

export const addressSchema = new mongoose.Schema({
    buildingNo: {
        type: String,
        required: true
    }, street: {
        type: String,
        required: true
    }, country: {
        type: String,
        required: true
    }, state: {
        type: String,
        required: true
    }, pincode: {
        type: Number,
        required: true
    }, city: {
        type: String,
        required: true
    }
})
export const cartSchema = new mongoose.Schema({
    product: productSchema,
    quantity: {
        type: Number,
        required: true
    }
})
export const crudSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },
    phonenumber: {
        type: Number,
        required: true,

    },

    password: {
        type: String,
        required: true,

    },
    cart: {
        type: [cartSchema],
        default: []
    },
    address: {
        type: [addressSchema],
        default: []
    }
})

const crudModel = mongoose.model('Model', crudSchema)

export default crudModel