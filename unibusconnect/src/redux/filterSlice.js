import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    from: "",
    to: "",
    date: "",
  },
  reducers: {
    setFrom: (state, action) => {
      state.from = action.payload;
    },
    setTo: (state, action) => {
      state.to = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setFrom, setTo, setDate } = filterSlice.actions;

export default filterSlice.reducer;
