import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  Admin: null,
  Auth: false,
}
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.Admin = action.payload.Admin
      state.Auth = action.payload.Auth
      return state
    },
  },
})

export const { setInitialState } = adminSlice.actions
export default adminSlice.reducer
