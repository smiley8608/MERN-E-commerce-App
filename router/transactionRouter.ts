
import express from 'express'
import * as Transaction from '../controller/TransactionController'
import { routerType } from '../Interface'
import Middlewere from '../middlewere/middleware'
const transactionRouter:routerType=express.Router()

transactionRouter.get('/getserverAddress',Middlewere,Transaction.serverAddress)
transactionRouter.post('/checkouts',Middlewere,Transaction.UpdatedTransaction)
transactionRouter.get('/getalltransaction',Middlewere,Transaction.getTransaction)

export default transactionRouter