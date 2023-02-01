import { configureStore } from '@reduxjs/toolkit'
import adminslice from './Adminslice'
const store = configureStore({
  reducer: {
    Admin: adminslice,
  },
})

export default store
// export type RootState = store.getState
// export type RootDispatch = store.dispatch
