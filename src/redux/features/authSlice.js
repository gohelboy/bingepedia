import { createSlice } from "@reduxjs/toolkit";
import { getLocalData, setLocalData } from "../../helper/quickeFunctions";

export const user = await JSON.parse(getLocalData('user'));

var initialValues = {
  user: user,
};

let authSlice = createSlice({
  name: "auth",
  initialState: initialValues,
  reducers: {
    loggedin: (state, action) => {
      const { token, ...user } = action.payload;
      state.user = user;
      setLocalData('token', token);
      setLocalData('user', JSON.stringify(user));
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.clear();
    },
  },
});

export const selectUser = (state) => state.auth.user;
export const { register, loggedin, logout } = authSlice.actions;
export default authSlice.reducer;
