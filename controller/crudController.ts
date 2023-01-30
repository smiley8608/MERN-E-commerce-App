import express = require('express')
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import Joi = require('joi')
import crudModel from '../model/crudmodel'
import Jwt from 'jsonwebtoken'
import { updatedRequest } from '../Interface'
dotenv.config()
const crudSchema = Joi.object({
    username: Joi.string().min(6).max(13).required(),
    firstname: Joi.string().max(30).trim().required(),
    lastname: Joi.string().max(30).trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$")).required(),
    phonenumber: Joi.number().required()
}).with('email', 'password')


export const formValidation = (req: express.Request, res: express.Response) => {
    const { username, firstname, lastname, phonenumber, email, password } = req.body

    crudSchema.validateAsync({ firstname, lastname, email, phonenumber, username, password })
        .then((succ) => {
            console.log('run');

            crudModel.find({ email: email })
                .then((response) => {
                    // console.log(response);
                    
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

                                        return res.json({ message: 'Unable to create account !', error: err })
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

                                        let token = Jwt.sign({ id: usermail._id }, process.env.TOKEN_SECURT)
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
    console.log('aaaaaa');
    
    
    console.log(req.user);
    
    if (!req.user) {
        
        return res.status(403).json({
            message:'You are not allowed to login please try again later ',
            user: null,
            auth: false,
        })
    }else{
        console.log(req.user)
        return res.status(200).json({
            message:'Welcome Back',
            auth:true,
            user:req.user
        })
    }
}


export const changePassword = (req: updatedRequest, res: express.Response) => {
    // console.log(req.body);
    
    const { oldPassword, newPassword, confNewPassword } = req.body

    if (newPassword !== confNewPassword) {
        return res.json({ message: "Passwords didn't match" })
    }
    
    crudModel.findById(req.user._id)
    .then(userFindResponse => {
        bcrypt.compare(newPassword, userFindResponse?.password as string)
        .then(prevpassuseCheck => {
            if (prevpassuseCheck) {
                console.log('prevpassuseCheck');
                
                return res.json({ message: "Your old password cannot be your new password" })
            }
            bcrypt.compare(oldPassword, userFindResponse?.password as string)
            .then(passCompare => {
                            // console.log('runner');
                            if (passCompare === false) {
                                return res.json({ message: "Your previous password is incorrect !!!" })
                            }
                            bcrypt.hash(newPassword, 15)
                                .then(hashedPass => {
                                    crudModel.updateOne({ _id: req.user._id }, { password: hashedPass })
                                        .then(response => {
                                            return res.json({ message: "Your Password is updated successfully..." })
                                        })
                                        .catch(err => {
                                            return res.json({ message: "Something happened." })
                                        })
                                })
                                .catch(err => {
                                    return res.json({ message: "Something happened.." })
                                })
                        })
                        .catch(err => {
                            return res.json({ message: "Something happened..." })
                        })
                })
                .catch(err => {
                    return res.json({ message: "Something happened...." })
                })
        })
        .catch(err => {
            return res.json({ message: "Something happened....." })
        })


}
const UpdateSchema = Joi.object({
    username: Joi.string().min(6).max(13).required(),
    firstname: Joi.string().max(30).trim().required(),
    lastname: Joi.string().max(30).trim().required(),
    // email: Joi.string().email().required(),
    phonenumber: Joi.number().required()
}).with('email', 'password')
export const UpdateUser=async(req:updatedRequest,res:express.Response)=>{
    // console.log(req.body);
    
    const {username,lname,fname,email,phonenumber}=req.body
    // console.log(username,lname,fname,email,phonenumber);

    try {
       await UpdateSchema.validateAsync({username:username,firstname:fname,lastname:lname,phonenumber:phonenumber})
     const userupdate= await crudModel.updateOne({_id:req.user._id},{username:username,firstname:fname,lastname:lname,email:email,phonenumber:phonenumber})
     if(!userupdate){
        return res.json({message:'something wents wrong!'})
     }else{
        return res.json({message:'Account updated successfully!',Result:userupdate})
     }
         
    } catch (error) {
        console.log(error);
        
    }
    
}