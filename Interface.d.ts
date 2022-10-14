
import express =require ('express')


export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    __v: number;
}
export interface  updatedRequest  extends express.Request{
    user:any
}

export interface routerType extends express.IRouter {
    post:(path:string ,...middleware:any)=>void,
    get:(path:string,...middleware:any)=>void
}

