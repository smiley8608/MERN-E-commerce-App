import express = require('express')
import * as storeRouter from '../controller/storeController'
import { routerType } from '../Interface'
import multer from 'multer'
import path = require('path')
import UserMiddlewere from '../middlewere/middleware'
const productRouter: routerType = express.Router()

const Storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'productphotos')
    }, filename(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const uplode = multer({ storage: Storage, limits: { fileSize: 1025 * 1025 * 1025 } })

productRouter.post('/allProduct', storeRouter.getAllProducts)
productRouter.get('/searchProduct', storeRouter.searchProduct)
productRouter.post('/deleteProduct', storeRouter.DeleteProduct)
productRouter.post('/getProduct', storeRouter.getProduct)
productRouter.post('/editproduct',uplode.single('productphotos'), storeRouter.UpdateProducts)
productRouter.post('/addproducts',uplode.single('productphotos'), storeRouter.Addproducts)

export default productRouter