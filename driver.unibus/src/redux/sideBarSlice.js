import { createSlice } from "@reduxjs/toolkit";

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
    close: (state, both = false) => {
      state.openNestedSideBar.open
        ? (state.openNestedSideBar.open = false)
        : (state.openSideBar = false);
      both && (state.openSideBar = false);
    },
    openNested: (state, { payload }) => {
      state.openNestedSideBar.open = true;
      state.openNestedSideBar.title = payload;

      // state.openNestedSideBar.content = navParentItems[payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close, openNested } = sideBarSlice.actions;

export default sideBarSlice.reducer;
