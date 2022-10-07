interface UserProps {
  
    username:string,
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    cart:[],
    address:{
        doorno:number,
        landmark:string,
        city:string,
        pincode:number
    }
 
}

interface InitialState {
    User:UserProps|null,
    Auth:boolean
}
