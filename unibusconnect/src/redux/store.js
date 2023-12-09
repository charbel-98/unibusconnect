import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "./sideBarSlice";
import authReducer from "./auth/authSlice";
import filterReducer from "./filterSlice";
import locationReducer from "./locationSlice";
export default configureStore({
  reducer: {
    sideBar: sideBarReducer,
    auth: authReducer,
    filter: filterReducer,
    location: locationReducer,
  },
});
