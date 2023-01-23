
import express from 'express'
import * as Transaction from '../controller/TransactionController'
import { routerType } from '../Interface'
import UserMiddlewere from '../middlewere/middleware'
const transactionRouter:routerType=express.Router()

transactionRouter.get('/getserverAddress',UserMiddlewere,Transaction.serverAddress)
transactionRouter.post('/checkouts',UserMiddlewere,Transaction.UpdatedTransaction)

export default transactionRouter