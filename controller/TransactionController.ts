
import express from 'express'
import dotenv from 'dotenv'
import OrderModel from '../model/orderModel'
import { updatedRequest } from '../Interface'
import { productmodel } from '../model/productModel'
dotenv.config()
export const serverAddress = (req: express.Request, res: express.Response) => {

    if (process.env.Server_Address) {
        return res.json({ serverAddress: process.env.Server_Address })
    } else {
        return ''
    }
}

export const UpdatedTransaction = (req: updatedRequest, res: express.Response) => {
    console.log(req.body);


    const { checkout, cart, payable, hash } = req.body
    console.log('checkout', checkout, "cart", cart, "payable", payable, "hash", hash);
    console.log(cart);

    if (hash === '') {
        return res.json({ message: "unable to find the hash" })
    } else {
        // productmodel.find({_id:cart})
        OrderModel.create({ amount: payable, product: cart, address: checkout, paymentDetails: hash, user: req.user._id, deliverIn: '7', deliverStatus: 'order-placed' })
            .then(responce => {

                cart.map((cartItem: any) => {

                    productmodel.findById(cartItem.product._id)
                        .then((result: any) => {
                            if (!result) {
                                return res.json({})
                            } else {
                                result.stock = result.stock - cartItem.quantity
                                result.save()
                                    .then((respon: any) => {
                                        // console.log(respon);

                                        // console.log(result);
                                        return res.json({ message: "Transaction Completed succssfully !" })
                                    })

                            }
                        }).catch(error => {
                            console.log(error);

                        })
                })

            })
            .catch(error => {
                console.log(error);
            })


    }
}

export const getTransaction = (req: updatedRequest, res: express.Response) => {

    OrderModel.find({ user: req.user._id })
        .then(responce => {
            console.log(responce);
            
            if (responce.length >= 1) {
                return res.json({ result: responce })
            } else {
                return res.json({ message: 'no transactin had yet made' })
            }
        }).catch(error => {
            console.log(error);

        })
}