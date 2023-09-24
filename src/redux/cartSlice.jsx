import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
   addCartFunc:(state, action) => {
    state.cart = [...state.cart, action.payload]
    console.log("cart: ",state.cart);
   },
  },
})

// Action creators are generated for each case reducer function
export const {addCartFunc, } = cartSlice.actions

export default cartSlice.reducer