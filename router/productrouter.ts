import express = require('express')
import * as storeRouter from '../controller/storeController'
import { routerType } from '../Interface'

const productRouter:routerType = express.Router()

productRouter.post('/allProduct',storeRouter.getAllProducts)
productRouter.get('/searchProduct',storeRouter.searchProduct)

export default productRouter