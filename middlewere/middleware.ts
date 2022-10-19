import express = require('express')
import Jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { updatedRequest } from '../Interface'
import crudModel from '../model/crudmodel'
import mongoose from 'mongoose'

dotenv.config()

const UserMiddlewere = (req: updatedRequest, res: express.Response, next: express.NextFunction) => {

    let ENV_SECURT = process.env.TOKEN_SECURT as Secret
    let Token = req.headers['jwt-token'] as string

    // console.log(req.headers);
    console.log(Token);
    
    if (Token && ENV_SECURT) {
        try {
            
            let varify = Jwt.verify(Token, ENV_SECURT)
            let decoded: any = Jwt.decode(Token)
            console.log(decoded);
            if(req.path !== "/signin" && req.path !== "/signup" && req.path !== "/forgotpassword" && req.path !== "/forgotpassword/:reseturl"){
                crudModel.findOne({_id: new mongoose.Types.ObjectId(decoded.id)})
                
                .then((response) => {
                        // console.log(response);
                        if(response?.password){
                            response.password = ""
                        }
                        req.user = response
                        next()
                    })
            } else {
                return res.status(401).json({message: "Hey Buddy, you're already logged in", auth: true})
            }
        } catch (err) {
            if (req.path === '/login' || req.path === '/register') {
                console.log({ message: 'unable to verify the tokens!' });
                next()
            }
            return res.status(403).json({ auth: false, message: "Authorization token is invalid or expired" })
        }
    } else {
        if (req.path === "/login" || req.path === "/register") {
            console.log('2222 ');
            next()
        } else {
            res.json({ auth: false, user: null,  })
        }
    }
}

export default UserMiddlewere