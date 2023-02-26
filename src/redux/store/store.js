import { configureStore } from "@reduxjs/toolkit";
import saveSlice from "../features/saveSlice";
const store = configureStore({
  reducer: {
    saveReducer: saveSlice,
  },
});

export default store;
