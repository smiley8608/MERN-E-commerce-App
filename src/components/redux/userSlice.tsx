import { createSlice, PayloadAction } from "@reduxjs/toolkit";


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
      state.Auth = action.payload.Auth
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
