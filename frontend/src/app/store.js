
import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiClient"
import authReducer from './slices/authSlice'
import alertReducer from './slices/alertSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    alert: alertReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})