import { configureStore } from "@reduxjs/toolkit";
import saveSlice from "../features/saveSlice";
import authSlice from "../features/authSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    saveReducer: saveSlice,
  },
});

export default store;
