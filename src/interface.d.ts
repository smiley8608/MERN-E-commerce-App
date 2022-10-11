interface UserProps {
  
    username:string,
    firstname:string,
    lastname:string,
    email:string,
    phonenumber:number,
    password:string,
    cart:[],
    address:{
        doorno:number,
        landmark:string,
        city:string,
        pincode:number
    }
 
}
interface Product {
    title:string,
    catagories:string,
    price:number,
    rating:number,
    image:string,
    imageList:string[]
}
interface InitialState {
    User:UserProps|null,
    Auth:boolean
}

interface LoginPropsType {
    email:string,
    password:string
}
interface RegisterPropsType {
    username:string,
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    phonenumber:number
}