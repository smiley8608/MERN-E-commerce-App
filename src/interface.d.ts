interface UserProps {
  
    username:string,
    firstname:string,
    lastname:string,
    email:string,
    phonenumber:number,
    password:string,
    cart:CartItem[],
    address:{
        doorno:number,
        landmark:string,
        city:string,
        pincode:number
    }
 
}

interface Product {
    _id: string
    title:string,
    description:string,
    catagories:string,
    price:number,
    rating:number,
    stock:number,
    brand:string,
   thumbnail:string
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

interface CartItem {
    product:Product,
    quantity:number
}