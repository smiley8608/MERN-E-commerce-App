import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import router from "./router/Userrouter";
import Cors from 'cors'
import productRouter from "./router/productrouter";
import transactionRouter from "./router/transactionRouter";
import { updateLiteralTypeNode } from "typescript";
import morgan from 'morgan'
import { allowedNodeEnvironmentFlags } from "process";
import AdminRouter from "./router/adminrouter";

const app = express()
app.use(Cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(bodyParser.urlencoded({ extended: false }))
// app.use(morgan("dev"))
app.use(express.json())
app.use(router)
app.use('/productphotos',express.static('productphotos'))
app.use(productRouter)
app.use(transactionRouter)
app.use('/admin',AdminRouter)
mongoose.connect('mongodb://localhost:27017/crud', (err) => {
    if (err) {
        console.log("unable to connect to the server");
    }


    console.log('DataBase connected successfullay!');

    app.listen(4000, () => {
        console.log("Server Started successfully in port 4000!");
    })
})

