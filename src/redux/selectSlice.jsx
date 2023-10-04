import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selected: {
        id:1,
        name: "Select a Category"
    },
    categories: [
        {
          id: 1,
          name: "Sweat",
        },
        {
          id: 2,
          name: "Shoes",
        },
        {
          id: 3,
          name: "Dress",
        },
        {
          id: 4,
          name: "Glasses",
        },
        {
          id: 5,
          name: "T-Shirt",
        },
        {
          id: 6,
          name: "Watch",
        },
        {
          id: 7,
          name: "Bag",
        },
        {
          id: 8,
          name: "Accessories",
        },
        {
          id: 9,
          name: "Other",
        }
      ], 
};

export const selectSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    selectItem: (state, action) => {
        state.selected = action.payload;
      },
      setCategories: (state, action) => {
        state.categories = action.payload;
      },
  },
});

// Action creators are generated for each case reducer function
export const { selectItem, setCategories} =
selectSlice.actions;

export default selectSlice.reducer;
