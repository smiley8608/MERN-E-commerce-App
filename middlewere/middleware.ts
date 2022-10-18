import express = require('express')
import Jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { updatedRequest } from '../Interface'
import crudModel from '../model/crudmodel'

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
            if (req.path === '/login' || req.path === '/register') {
                return res.json(({ Message: "Entery resticted !" }))
            } else {
                crudModel.findById(decoded.id)
                .then((result) => {
                    console.log('right');
                    req.user = result
                    
                    next()
                }).catch((err) => {
                    return res.json({ message: 'could not able to find the docoded id !' });
                })
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