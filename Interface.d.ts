
import express =require ('express')


export interface User {
    _id: string;
    username: string;
    lastname:string,
    email: string;
    phonenumber:number,
    password: string;
    cart:[],
    address:[]
    __v: number;
}
export interface  updatedRequest  extends express.Request{
    user:User
}

export interface Admin{
    username:string,
    email:string,
    password:string
}
export interface AdminUpdatedRequest extends express.Request{
    Admin:Admin
}

export interface routerType extends express.IRouter {
    post:(path:string ,...middleware:any)=>void,
    get:(path:string,...middleware:any)=>void
}

