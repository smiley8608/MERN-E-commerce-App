import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialState = {
  User: {
    username: "sakthi",
    firstname: "sakthi",
    lastname: "bala",
    email: "sakthibala@gmail.com",
    phonenumber:1234567678,
    password: "1234567890",
    cart: [],
    address: {
      doorno: 1234567,
      landmark: "near RTO Office",
      city: "coimbatore",
      pincode: 641004,
    },
  },
  Auth:false
};

const reduxSlice = createSlice({
  name: "data",
  initialState:initialState,
  reducers:{
    setInitialState:(
      state: InitialState,
      action: PayloadAction<UserProps>
    ) => {
      state.User = action.payload;
    },
    setUser: (state: InitialState, action: PayloadAction<UserProps>) => {
      state.User=action.payload
      // console.log(action.payload);
      
    },
    setAuth : (state: InitialState, action: PayloadAction<any>) => {
      state.Auth = action.payload
      console.log(action.payload);
    }
  },
});
export const {setInitialState,setUser, setAuth} = reduxSlice.actions
export default reduxSlice.reducer
