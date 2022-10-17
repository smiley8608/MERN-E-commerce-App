import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState: InitialState = {
//   User: {
//     username: "sakthi",
//     firstname: "sakthi",
//     lastname: "bala",
//     email: "sakthibala@gmail.com",
//     phonenumber:1234567678,
//     password: "1234567890",
//     cart: [],
//     address: {
//       doorno: 1234567,
//       landmark: "near RTO Office",
//       city: "coimbatore",
//       pincode: 641004,
//     },
//   },
//   Auth:false
// };
const initialState: InitialState = {
  User: null,
  Auth: false,
};

const reduxSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    setInitialState: (
      state: InitialState,
      action: PayloadAction<InitialState>
    ) => {
      state.User = action.payload.User
      state.Auth=action.payload.Auth
    },
    setReplaceCart: (
      state: InitialState,
      action: PayloadAction<CartItem[]>
    ) => {
      if (state.User) {
        state.User.cart = action.payload;
      }
    }
    
  },
});
export const { setInitialState, setReplaceCart} =
  reduxSlice.actions;
export default reduxSlice.reducer;
