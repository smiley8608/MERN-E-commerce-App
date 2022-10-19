
import express =require ('express')
import *   as crudRouter from '../controller/crudController'
import { Router } from 'express'
import middleWere from '../middlewere/middleware'
import { routerType } from '../Interface'


const router:routerType=Router()

router.post('/login',middleWere,crudRouter.loginValidation)
router.post('/register',middleWere,crudRouter.formValidation)
router.post('/cart',middleWere,crudRouter.cartChanger)
router.get('/authstatus',middleWere,crudRouter.UserStatus)
router.post('/deletecart',middleWere,crudRouter.cartdeleter)
router.post('/changepassword',middleWere,crudRouter.changePassword)
export default router