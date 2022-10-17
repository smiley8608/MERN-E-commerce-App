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
export const UserStatus = (req:updatedRequest, res: express.Response):any => {
    
    console.log(req.user);
    
    if (!req.user) {
        
        return res.status(404).json({
            user: null,
            auth: false,
            message: 'You are not allowed to logged in please try again late ',
        })
    }else{
        console.log(req.user)
        return res.status(200).json({
            auth:true,
            message:'Welcome Back',
            user:req.user
        })
    }
}

const mergeCart = async (localCart: any[], UserCart: any[]) => {
    let newArr: any[] = []
    let localCartStore: any[] = { ...localCart }
    let userCartStore: any[] = { ...UserCart }

    for (let i = 0; i < userCartStore.length; i++) {
        let filter = localCartStore.filter((value, index) => {
            return String(value.product._id) === String(userCartStore[i].product._id)
        })
        if (filter.length > 0) {
            const FindIndex = localCartStore.findIndex((value, index) => {
                return String(value.product._id) === String(userCartStore[i].product._id)
            })
            if (localCartStore.length == 0) {
                return newArr
            }
            let newItems = { product: userCartStore[FindIndex].product, quantity: localCartStore[FindIndex].quantity + userCartStore[i].quantity }
            localCartStore = localCartStore.filter((value) => {
                value.product._id !== userCartStore[i].product._id
                return newArr.push(newItems)
            })
        } else {
            return newArr.push(userCartStore[i])
        } let newCart = [{ ...newArr, ...localCartStore }]
        return newCart
    }
}


export const changeCart = (req: updatedRequest, res: express.Response) => {
    const localCart = req.body.cart
    const userCart = req.user.cart

    const newCart = mergeCart(localCart, userCart)
    setTimeout(() => {

        crudModel.findByIdAndUpdate(req.user._id, { cart: newCart })
            .then(response => {
                crudModel.findById(req.body._id)
                    .then(result => {
                        return res.json({ message: 'Add to Cart', result: result?.cart })
                    })
                    .catch(err => {
                        return res.json({ message: err })
                    })
            })
            .catch(err => {
                return res.json({ message: err })
            })
    }, 3000)

}

export const cartDeleter=(req:updatedRequest,res:express.Response)=>{
       const product=req.body.product
       const cart=req.user.cart
       let newCart=cart.filter((value:any)=>String(value.product._id) !== String(product._id))

       setInterval(()=>{
        crudModel.findByIdAndUpdate(req.user._id,{cart:newCart})
        .then(result=>{
            crudModel.findById(req.user._id)
            .then(responce=>{
                return res.json({message :'cart deleted successfully',result:responce})
            })
            .catch(err=>res.json({message:err.message}))       
            
        })
        .catch(err=>res.json({message:err.message}))
       })   
}