import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartFunc: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.cart.find((item) => item.product.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ product: action.payload, quantity: 1 }); // Yeni ürün ekle
      }
      // state.cart = [...state.cart, action.payload]
      console.log("cart: ", state.cart);
    },
    deleteCartfunc: (state, action) => {
      state.cart = [
        ...state.cart.filter((dt) => dt.product.id !== action.payload),
      ];
    },
    increaseQuantity: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.cart.find((item) => item.product.id === id);
      existingItem.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.cart.find((item) => item.product.id === id);
      if(existingItem.quantity >1){
         existingItem.quantity -= 1;
      }
     
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCartFunc, deleteCartfunc, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
