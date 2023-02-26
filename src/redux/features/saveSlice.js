import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};

const saveSlice = createSlice({
  name: "saveSlice",
  initialState,
  reducers: {
    addToWatchlist(state, action) {
      localStorage.setItem(
        "watchlist",
        JSON.stringify([action.payload, ...state.watchlist])
      );
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
    },
    removeFromWatchlist(state, action) {
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (element) => element.id !== action.payload
        ),
      };
    },
    addToWatched(state, action) {
      console.log("work");
      localStorage.setItem(
        "watched",
        JSON.stringify([action.payload, ...state.watched])
      );
      return {
        ...state,
        watched: [action.payload, ...state.watched],
      };
    },
    removeFromWatched(state, action) {
      return {
        ...state,
        watched: state.watched.filter(
          (element) => element.id !== action.payload
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
