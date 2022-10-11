import express = require('express')
import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { updatedRequest } from '../Interface'
import crudModel from '../model/crudmodel'

dotenv.config()

const UserMiddlewere =(req:updatedRequest,res:express.Response,next:express.NextFunction) => {

    let ENV_SECURT = process.env.TOKEN_SECURT
    let Token = req.headers['Jwt-token'] as string

    if (Token && ENV_SECURT) {
        try {
            let varify = Jwt.verify(Token, ENV_SECURT)
            let decoded: any = Jwt.decode(Token)
            console.log(decoded);
            if (req.path === '/login'|| req.path === '/register') {
                return res.json(({ Message: "Entery resticted !" }))
            } else {
                crudModel.findById(decoded.id)
                    .then((result) => {
                        console.log(result);
                        req.user = result
                        next()
                    }).catch((err) => {
                        return res.json({ message: 'could not able to find the docoded id !' });
                    })
            }
        } catch (err) {
            if(req.path==='/login'||req.path==='/register')
            console.log({ message: 'unable to verify the tokens!' });
            next()
        }
    } else {
        if(req.path==='/login'||req.path==='/register')
        next()
    }
}

export default UserMiddlewere