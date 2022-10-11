
import express =require ('express')

export interface  updatedRequest  extends express.Request{
    user:any
}

export interface routerType extends express.IRouter {
    post:(path:string ,...middleware:any)=>void
}