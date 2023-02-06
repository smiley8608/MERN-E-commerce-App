
import express =require ('express')
import *   as crudRouter from '../controller/crudController'
import { Router } from 'express'
import middleWere from '../middlewere/middleware'
import { routerType } from '../Interface'
import * as cart from '../controller/cartController'

const router:routerType=Router()

router.post('/login',middleWere,crudRouter.loginValidation)
router.post('/register',middleWere,crudRouter.formValidation)
router.post('/updateuser',middleWere,crudRouter.UpdateUser)
router.post('/cart',middleWere,cart.cartChanger)
router.get('/authstatus',middleWere,crudRouter.UserStatus)
router.post('/deletecart',middleWere,cart.cartdeleter)
router.post('/changepassword',middleWere,crudRouter.changePassword)
router.post('/cancelorder',middleWere,crudRouter.cancelOrder)
export default router