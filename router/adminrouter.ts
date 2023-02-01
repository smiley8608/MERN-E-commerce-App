
import express from 'express'
import Middlewere from '../middlewere/middleware'
import * as Admin from '../controller/adminController'
import { routerType } from '../Interface'
import AdminMiddlewere from '../middlewere/adminMiddleware'

const AdminRouter:routerType=express.Router()
// console.log('tcybuniodp');


AdminRouter.post('/register',AdminMiddlewere,Admin.createAdmin)
AdminRouter.get('/authStatus',AdminMiddlewere,Admin.authStatus)
AdminRouter.post('/login',AdminMiddlewere,Admin.AdminLogin)
AdminRouter.get('/allproducts',Admin.allproducts)
AdminRouter.get('/getallorder',Admin.OrderList)
AdminRouter.get('/getalluser',Admin.UserList)
AdminRouter.post('/orderstatus',Admin.UpdateOrder)

export default AdminRouter