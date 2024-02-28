import { createSlice } from "@reduxjs/toolkit";

const alertTypes = ['success', 'error', 'warning']

const initialState = {
  text: '',
  type: 'error',
  isVisible: false,
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      const type = action.payload[1]
      if (alertTypes.includes(type)) {
        state.text = action.payload[0]
        state.type = type
        state.isVisible = true
      }
    },
    resetAlert: (state) => {
      state.text = ''
      state.type = 'error'
      state.isVisible = false
    },
  }
})

export const {setAlert, resetAlert} = alertSlice.actions
export const selectCurrentAlert = (state) => state.alert


export default alertSlice.reducer