import express = require('express')
import * as storeRouter from '../controller/storeController'

const productRouter = express.Router()

productRouter.post('/allProduct', storeRouter.productController)
productRouter.post('/searchProduct?search=', storeRouter.searchController)

export default productRouter