import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  keyword:""
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    createDatafunc: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    sortingDatafunc: (state, action) => {
      state.data = [
        ...state.data.sort((a, b) =>
          action.payload === "asc"
            ? a.price - b.price
            : action.payload === "desc"
            ? b.price - a.price
            : null
        ),
      ];
    },
    deleteDatafunc: (state, action) => {
      state.data = [...state.data.filter((dt) => dt.id !== action.payload)];
    },
    updateDatafunc: (state, action) => {
      state.data = [
        ...state.data.map((dt) =>
          dt.id === action.payload.id ? { ...dt, ...action.payload } : dt
        ),
      ];
    },
    searchingDatafunc: (state, action) => {
      state.keyword = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { createDatafunc, deleteDatafunc, updateDatafunc, sortingDatafunc, searchingDatafunc } =
  dataSlice.actions;

export default dataSlice.reducer;
