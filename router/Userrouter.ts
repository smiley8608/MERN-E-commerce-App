
import express =require ('express')
import *   as crudRouter from '../controller/crudController'
import { Router } from 'express'
import middleWere from '../middlewere/middleware'
import { routerType } from '../Interface'


const router:routerType=Router()

router.post('/login',middleWere,crudRouter.loginValidation)
router.post('/register',middleWere,crudRouter.formValidation)

export default router