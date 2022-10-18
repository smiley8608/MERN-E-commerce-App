import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import router from "./router/Userrouter";
import Cors from 'cors'
import productRouter from "./router/productrouter";


const app = express()
app.use(Cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)
app.use(productRouter)
mongoose.connect('mongodb://localhost:27017/crud', (err) => {
    if (err) {
        console.log("unable to connect to the server");
    }


    console.log('DataBase connected successfullay!');

    app.listen(4000, () => {
        console.log("Server Started successfully in port 4000!");
    })
})

