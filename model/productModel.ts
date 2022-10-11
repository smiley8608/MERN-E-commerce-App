
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    catagories: {
        type: String,
        require: true
    }, price: {
        type: Number,
        require: true
    }, rating: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    }, imageList: []
})

export const productmodel=mongoose.model('product',productSchema)