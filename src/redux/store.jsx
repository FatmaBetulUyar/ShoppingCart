import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice'
import modalSlice from './modalSlice'
import selectSlice from './selectSlice'

export const store = configureStore({
  reducer: {
    data:dataSlice,
    modal:modalSlice,
    category:selectSlice
  },
})

