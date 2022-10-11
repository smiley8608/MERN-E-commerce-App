import mongoose from "mongoose";

const crudSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '',
        require: true
    },
    firstname: {
        type: String,
        require: true,
        default: ''
    },
    lastname: {
        type: String,
        require: true,
        default: ''
    },
    email: {
        type: String,
        require: true,
        default: ''
    },
    phonenumber: {
        type: Number,
        require: true,
        default: false
    },

    password: {
        type: String,
        require: true,
        default: ''
    },
    cart: [],
    address:[ ]
})

const crudModel = mongoose.model('Model', crudSchema)

export default crudModel