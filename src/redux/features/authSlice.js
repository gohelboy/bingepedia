import { createSlice } from "@reduxjs/toolkit";
import { getLocalData, setLocalData } from "../../helper/quickeFunctions";

var user = getLocalData('user');

var initialValues = {
  user: user,
};

let authSlice = createSlice({
  name: "auth",
  initialState: initialValues,
  reducers: {
    loggedin: (state, payload) => {
      const { token, ...user } = payload.payload;
      state.user = user;
      setLocalData('token', token);
      setLocalData('user', JSON.stringify(user));
    },
    logout: (state, payload) => {
      state.user = null;
      localStorage.clear();
    },
  },
});

export const selectUser = (state) => state.auth.user;

export const { register, loggedin, logout } = authSlice.actions;
export default authSlice.reducer;
