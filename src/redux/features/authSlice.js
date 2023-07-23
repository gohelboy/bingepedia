import jwtDecode from "jwt-decode";
import { createSlice } from "@reduxjs/toolkit";

export const getUserFromToken = () => {
  const token = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : null;
  if (token === null) return null;
  return jwtDecode(token);
};

var user = getUserFromToken();

var initialValues = {
  user: user,
  isLoading: false,
};

let authSlice = createSlice({
  name: "auth",
  initialState: initialValues,
  reducers: {
    login: (state, payload) => {},
    logout: (state, payload) => {},
  },
});

export const selectUser = (state) => state.auth.user;

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
