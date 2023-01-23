import express =require('express')
import { updatedRequest } from '../Interface'
import crudModel from '../model/crudmodel'

const cartMerger = (stayscart: any[], userscart: any[], decline: boolean | undefined | null): any[] => {
    let newarr: any[] = []

    if (!stayscart) {
        return userscart
    }

    let staycart = [...stayscart]
    let usercart = [...userscart]


    if (usercart.length > 0) {
        for (let i = 0; i < usercart.length; i++) {
            let filter = staycart.filter((value, index) => {
                return String(value.product._id) === String(usercart[i].product._id)
            })


            if (filter.length > 0) {
                let findex = staycart.findIndex(value => String(value.product._id) === String(usercart[i].product._id))


                if (staycart.length === 0) {
                    break
                }
                let newItem = { product: usercart[i].product, quantity: (decline ? staycart[findex].quantity : staycart[findex].quantity + usercart[i].quantity) }
                staycart = staycart.filter(value => String(value.product._id) !== String(staycart[findex].product._id))
                newarr.push(newItem)


            } else {
                newarr.push(usercart[i])
            }
        }
        newarr = [...newarr, ...staycart]

    } else {
        newarr = [...staycart]
    }
    return newarr
}

export const cartChanger = async (req:updatedRequest, res: express.Response) => {
        console.log(req.body.cart);
        
    let staycart: any[] = req.body.cart
    let usercart: any[] = req.user.cart
    let decline: boolean | undefined | null = req.body.decline
    console.log('decline',req.body.decline);
    console.log('staycart',staycart);
    console.log('usercart',usercart);
    

    console.log("staycart=====================",staycart);
    

    let newcart = cartMerger(staycart, usercart, decline)

    setTimeout(() => {
        crudModel.findByIdAndUpdate(req.user._id, { cart: newcart })
            .then(updateCartResponse => {
                crudModel.findById(req.user._id).then(response => {
                    res.json({ cart: response?.cart })
                })
            })
            .catch(err => {
                console.log(err);
                res.json({ message: "Cannot update cart", error: err })
            })
    }, 20);
}

export const cartdeleter = async (req: updatedRequest, res: express.Response) => {
    const product = req.body.product
    const cart = req.user.cart

    let newcart = cart.filter((item: any) => String(item.product._id) !== String(product._id))


    setTimeout(() => {
        crudModel.findByIdAndUpdate(req.user._id, { cart: newcart })
            .then(updateCartResponse => {
                crudModel.findById(req.user._id)
                    .then(userResponse => res.json({ cart: userResponse?.cart }))
                    .catch(err => res.json({ message: "User Error", error: err }))
            })
            .catch(err => {
                console.log(err);
                res.json({ message: "Cannot update cart", error: err })
            })
    }, 20);
}