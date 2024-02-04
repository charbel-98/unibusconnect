import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "./sideBarSlice";
import authReducer from "./auth/authSlice";

export default configureStore({
  reducer: {
    sideBar: sideBarReducer,
    auth: authReducer,
  },
});
