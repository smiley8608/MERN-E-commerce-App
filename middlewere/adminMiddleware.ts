import express = require('express')
import Jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Admin, AdminUpdatedRequest} from '../Interface'
import crudModel from '../model/crudmodel'
import mongoose from 'mongoose'

dotenv.config()

const AdminMiddlewere = (req: AdminUpdatedRequest, res: express.Response, next: express.NextFunction) => {

    let ENV_SECURT = process.env.TOKEN_SECURT as Secret
    let Token = req.headers['Admin-token'] as string
console.log('sdfghjk');

    // console.log(req.headers);
    // console.log(Token);
    
    if (Token && ENV_SECURT) {
        try {
            
            let varify = Jwt.verify(Token, ENV_SECURT)
            let decoded: any = Jwt.decode(Token)
            // console.log('decoded',decoded);
            if(req.path !== "/register" && req.path !== "/login" && req.path !== "/forgotpassword" && req.path !== "/forgotpassword/:reseturl"){
                crudModel.findOne({_id: new mongoose.Types.ObjectId(decoded.id)})
                
                .then((response) => {
                        console.log('response',response);
                        // if(response?.password){
                        //     response.password = ""
                        // }
                        req.Admin = response as unknown as Admin
                        next()
                    })
            } else {
                return res.status(401).json({message: "Hey Buddy, you're already logged in", Auth: true})
            }
        } catch (err) {
            if (req.path === '/login' || req.path === '/register') {
                console.log({ message: 'unable to verify the tokens!' });
                next()
            }
            return res.status(403).json({ Auth: false, message: "Authorization token is invalid or expired" })
        }
    } else {
        if (req.path === "/login" || req.path === "/register") {
            // console.log('2222 ');
            next()
        } else {
            res.json({ Auth: false, Admin: null,  })
        }
    }
}

export default AdminMiddlewere