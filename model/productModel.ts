
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }, 
    price: {
        type: Number,
        require: true
    }, 
    rating: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    }, brand: {
        type: String,
        require: true
    },
    catagories: {
        type: String,
        require: true
    },
    thumbnail: {
        type: String,
        require: true
    }
})

export const productmodel = mongoose.model('product', productSchema)