import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    currentLocation: { lat: null, lng: null },
    address: null,
  },
  reducers: {
    setLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLocation, setError, setAddress } = locationSlice.actions;

export default locationSlice.reducer;
