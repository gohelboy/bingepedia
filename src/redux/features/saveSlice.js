import { createSlice } from "@reduxjs/toolkit";
import { user } from "./authSlice";

export const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

export const getWatched = async (id) => {
  const res = await fetch(BASE_URL + '/watched/get', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  })
  const resData = await res.json();
  if (resData.status === 0) return [];
  if (resData.status === 1) return resData.data || []
};

export const getWatchlist = async (id) => {
  const res = await fetch(BASE_URL + "/watchlist/get", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  })
  const resData = await res.json();
  if (resData.status === 0) return [];
  if (resData.status === 1) return resData.data || []
};

let initialState = {
  watchlist: await getWatchlist(user?.id),
  watched: await getWatched(user?.id),
};

const saveSlice = createSlice({
  name: "saveSlice",
  initialState,
  reducers: {
    addToWatchlist(state, action) { return { ...state, watchlist: [action.payload, ...state.watchlist], }; },
    removeFromWatchlist(state, action) { return { ...state, watchlist: state.watchlist.filter((element) => element.id !== action.payload.id) }; },
    addToWatched(state, action) { return { ...state, watched: [action.payload, ...state.watched], }; },
    removeFromWatched(state, action) { return { ...state, watched: state.watched.filter((element) => element.id !== action.payload.id) }; },
    getAllUserList: (state, action) => { state.watchlist = action.payload.watchlist || []; state.watched = action.payload.watched || []; },
    removeAllUsersList: (state) => { state.watchlist = []; state.watched = []; }
  },
});

export const selectWatchlist = (state) => state.saveReducer.watchlist;
export const selectWatched = (state) => state.saveReducer.watched;

export const { addToWatchlist, removeFromWatchlist, addToWatched, removeFromWatched, removeAllUsersList, getAllUserList } = saveSlice.actions;
export default saveSlice.reducer;
