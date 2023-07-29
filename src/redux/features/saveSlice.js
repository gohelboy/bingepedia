import { createSlice } from "@reduxjs/toolkit";
import { getLocalData } from "../../helper/quickeFunctions";

export const getWatched = async () => {
  const res = await fetch('http://localhost:5000/api/watched/get', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": getLocalData('token'),
    },
  })
  const resData = await res.json();
  if (resData.status === 0) {

  } else if (resData.status === 1) {
    return resData.data || []
  }
};

export const getWatchlist = async () => {
  const res = await fetch('http://localhost:5000/api/watchlist/get', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": getLocalData('token'),
    },
  })
  const resData = await res.json();
  if (resData.status === 0) {

  } else if (resData.status === 1) {
    return resData.data || [];
  }
};

let initialState = {
  watchlist: await getWatchlist(),
  watched: await getWatched(),
};

const saveSlice = createSlice({
  name: "saveSlice",
  initialState,
  reducers: {
    addToWatchlist(state, action) {
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
    },
    removeFromWatchlist(state, action) {
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (element) => element.id !== action.payload.id
        ),
      };
    },
    addToWatched(state, action) {
      return {
        ...state,
        watched: [action.payload, ...state.watched],
      };
    },
    removeFromWatched(state, action) {
      return {
        ...state,
        watched: state.watched.filter(
          (element) => element.id !== action.payload.id
        ),
      };
    },
  },
});

export const {
  addToWatchlist,
  removeFromWatchlist,
  addToWatched,
  removeFromWatched,
} = saveSlice.actions;
export default saveSlice.reducer;
