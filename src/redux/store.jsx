import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice'
import modalSlice from './modalSlice'
import selectSlice from './selectSlice'
import cartSlice from './cartSlice'

export const store = configureStore({
  reducer: {
    data:dataSlice,
    modal:modalSlice,
    category:selectSlice,
    cart:cartSlice
  },
})

