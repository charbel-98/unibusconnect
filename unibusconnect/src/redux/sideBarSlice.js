import { createSlice } from "@reduxjs/toolkit";

import { navParentItems } from "../components/navigation/nav-components/sideBarData";
const initialState = {
  openSideBar: false,
  openNestedSideBar: {
    open: false,
    title: null,
    content: null,
    path: null,
  },
};

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    open: (state) => {
      state.openSideBar = true;
    },
    close: (state) => {
      state.openSideBar = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close, openNested } = sideBarSlice.actions;

export default sideBarSlice.reducer;
