import { createSlice } from "@reduxjs/toolkit";
import { getLocalData, setLocalData } from "../../helper/quickeFunctions";

let storedUser = null;
try {
  const rawUser = getLocalData("user");
  storedUser = rawUser ? JSON.parse(rawUser) : null;
} catch (e) {
  storedUser = null;
}

const initialValues = {
  user: storedUser,
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
