import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    from: "",
    to: "",
    isDeparting: null,
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
    setIsDeparting: (state, action) => {
      state.isDeparting = action.payload;
    },
    setFilter: (state, action) => {
      state.from = action.payload?.from;
      state.to = action.payload?.to;
      state.date = action.payload?.date;
      state.isDeparting = action.payload?.isDeparting;
    },
  },
});

export const { setFrom, setTo, setDate, setIsDeparting, setFilter } =
  filterSlice.actions;

export default filterSlice.reducer;
