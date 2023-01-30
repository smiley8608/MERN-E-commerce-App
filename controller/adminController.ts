
import express from 'express'
import Joi from 'joi'
import { AdminModel } from '../model/adminmodel';
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import Jwt from 'jsonwebtoken';
import crudModel from '../model/crudmodel';
import { productmodel } from '../model/productModel';
import OrderModel from '../model/orderModel';





dotenv.config()
const AdminSchema = Joi.object({
    username: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$")).required(),
})
export const createAdmin = async (req: express.Request, res: express.Response) => {
    console.log(req.body);

    const { username, email, password, conformPassword } = req.body
    if (password === conformPassword) {
        try {
            const Adminvalidate = await AdminSchema.validateAsync({ username: username, email: email, password: password })
            const Adminexist = await AdminModel.findOne({ email: email })
            if (!Adminexist) {
                const hasedPassword = await bcrypt.hash(password, 8)
                if (!hasedPassword) {
                    return res.json({ message: 'something wents wrong' })
                } else {
                    const AdminAccount = await AdminModel.create({ username: username, email: email, password: hasedPassword })
                    if (process.env.TOKEN_SECURT) {
                        let token = Jwt.sign('Admin-token', process.env.TOKEN_SECURT)
                        return res.json({ message: 'Admin created SUccessfully!', Admin: AdminAccount, Auth: true, tkn: token })
                    }
                }

            } else {
                return res.json({ message: "Admin already exists" })
            }

        } catch (error) {
            console.log(error);

        }
    } else {
        return res.json({ message: 'something wents wrong' })
    }
}
const loginschema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$")).required(),

})
export const AdminLogin = async (req: express.Request, res: express.Response) => {

    const { email, password } = req.body
    try {

        const validateAdmin = await loginschema.validateAsync({ email: email, password: password })
        const AdminAccount = await AdminModel.findOne({ email: email })
        if (!AdminAccount) {
            return res.json({ message: 'Account Doest not exists' })
        } else {
            const compPassword = await bcrypt.compare(password, AdminAccount.password)
            if (!compPassword) {
                return res.json({ message: 'Please check the password' })
            } else {
                if (process.env.TOKEN_SECURT) {
                    let token = Jwt.sign('Admin-token', process.env.TOKEN_SECURT)
                    return res.json({ message: "Account login successfully", Admin: AdminAccount, Auth: true, tkn: token })
                }
            }
        }
    } catch (error) {
        console.log(error);

    }

}

export const allproducts = (req: express.Request, res: express.Response) => {
    productmodel.find({})
        .then(result => {
            console.log(result.length);
            return res.json({ products: result })

        }).catch(error => {
            console.log(error);

        })
}

export const OrderList = (req: express.Request, res: express.Response) => {
    OrderModel.aggregate([{ $lookup: { from: 'models', localField: 'user', foreignField: '_id', as: 'user_id' } }, { $unwind: '$user_id' }])
        .then(result => {
            console.log(result);
            return res.json({ order: result })
        }).catch(error => {
            console.log(error);

        })
}

export const UserList = (req: express.Request, res: express.Response) => {
    crudModel.find({})
        .then((result) => {
            console.log(result.length);
            
            if (result.length > 0) {

                return res.json({ user: result })
            } else {
                return res.json({ message: 'no user founded' })
            }
        })
        .catch(error => {
            console.log(error);

        })
}