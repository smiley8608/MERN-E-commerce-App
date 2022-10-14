import express = require('express')
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import Joi = require('joi')
import crudModel from '../model/crudmodel'
import Jwt from 'jsonwebtoken'
import { updatedRequest } from '../Interface'
dotenv.config()
const crudSchema = Joi.object({
    username: Joi.string().min(6).max(13).required().trim(),
    firstname: Joi.string().min(5).max(30).trim().required(),
    lastname: Joi.string().min(5).max(30).trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$")).required(),
    phonenumber: Joi.number()
}).with('email', 'password')


export const formValidation = (req: express.Request, res: express.Response) => {
    const { username, firstname, lastname, phonenumber, email, password } = req.body

    crudSchema.validateAsync({ firstname, lastname, email, phonenumber, username, password })
        .then((succ) => {
            console.log('run');

            crudModel.find({ email: email })
                .then((response) => {
                    if (response.length >= 1) {
                        return res.json({ message: 'Account already exists !' })
                    }
                    {
                        bcrypt.hash(password, 10)
                            .then((pwd) => {
                                console.log('runnns');

                                crudModel.create({ firstname, lastname, email, phonenumber, username, password: pwd })
                                    .then((result) => {
                                        console.log('succ');

                                        let token
                                        if (process.env.TOKEN_SECURT) {
                                            token = Jwt.sign({ id: result._id }, process.env.TOKEN_SECURT)
                                            console.log(token);

                                            return res.json({ message: 'Account created successfully !', result: result, tkn: token, auth: true })
                                        } else {
                                            return res.json({ message: 'Something went wrong' })
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err);

                                        return res.json({ message: 'Something wents wrong !', error: err })
                                    })
                            })
                            .catch((err) => {
                                return res.json({ message: 'Something wents wrong !', error: err })
                            })
                    }

                })
                .catch((err) => {
                    return res.json({ message: 'Something wents wrong !', error: err })
                })
        })
        .catch((err) => {
            return res.json({ message: 'Something wents wrong !', error: err })
        })

}
const loginschema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$")).required()
})

export const loginValidation = (req: express.Request, res: express.Response) => {
    const { email, password } = req.body
    loginschema.validateAsync({ email, password })
        .then(validate => {
            crudModel.findOne({ email: validate.email })
                .then(usermail => {
                    if (!usermail) {
                        return res.json({ message: 'please enter the valid Email !' })
                    } else {
                        bcrypt.compare(password, usermail.password)
                            .then(userpwd => {
                                if (!userpwd) {
                                    return res.json({ message: 'please enter the valid password' })
                                } else {
                                    if (process.env.TOKEN_SECURT) {

                                        let token = Jwt.sign({ id: validate._id }, process.env.TOKEN_SECURT)
                                        return res.json({ message: 'Logined Successfully !', result: usermail, tkn: token, auth: true })
                                    }
                                }
                            })
                            .catch(err => {
                                return res.json({ message: 'somthings went wrong', error: err })
                            })
                    }
                })
                .catch(err => {
                    return res.json({ message: 'somthings went wrong', error: err })
                })
        })
        .catch(err => {
            return res.json({ message: 'somthings went wrong', error: err })
        })
}
// <----------------------------------------------------------------------------------------------------------------------------------------->
const cartMerger = (stayscart: any[], userscart: any[]):any[] => {
    let newarr:any[] = []
    let staycart = [...stayscart]
    let usercart = [...userscart]
   
    
    for (let i = 0; i < usercart.length; i++){
        let filter = staycart.filter((value,index) => {
            return String(value.product._id) === String(usercart[i].product._id)
        })
        
        
        if(filter.length > 0){
            let findex = staycart.findIndex(value => String(value.product._id) === String(usercart[i].product._id))
            
            
            if(staycart.length === 0){
                continue
            }
            let newItem = {product: usercart[i].product, quantity: staycart[findex].quantity+usercart[i].quantity}
            staycart = staycart.filter(value => String(value.product._id) !== String(staycart[findex].product._id))
            newarr.push(newItem)
            
            
        } else {
            newarr.push(usercart[i])
        }
    }
    newarr = [...newarr, ...staycart]
    
    
    return newarr
}

export const cartChanger = async (req:updatedRequest, res: express.Response) => {

    let staycart: any[] = req.body.cart
    let usercart: any[] = req.user.cart


    let newcart = cartMerger(staycart, usercart)

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
    }, 2000);
}