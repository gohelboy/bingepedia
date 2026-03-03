import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocalData } from "../../helper/quickeFunctions";

export const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

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

export const AsyncAddToWatchlist = createAsyncThunk('watchlist/add', async (data) => {
  const response = await fetch(BASE_URL + '/watchlist/add', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": getLocalData('token'),
    },
    body: JSON.stringify({ data: data })
  })
  const resData = await response.json()
  return resData;
})

export const AsyncRemoveFromWatchlist = createAsyncThunk('watchlist/remove', async (data) => {
  const response = await fetch(BASE_URL + '/watchlist/remove', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": getLocalData('token'),
    },
    body: JSON.stringify({ id: data.id })
  })
  const resData = await response.json()
  return resData;
})

export const AsyncAddToWatched = createAsyncThunk('watched/add', async (data) => {
  const response = await fetch(BASE_URL + '/watched/add', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": getLocalData('token'),
    },
    body: JSON.stringify({ data: data })
  })
  const resData = await response.json()
  return resData;
})

export const AsyncRemoveFromWatched = createAsyncThunk('watched/remove', async (data) => {
  const response = await fetch(BASE_URL + '/watched/remove', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": getLocalData('token'),
    },
    body: JSON.stringify({ id: data.id })
  })
  const resData = await response.json()
  return resData;
})

export const initializeUserLists = createAsyncThunk(
  "save/initializeUserLists",
  async (_, { getState }) => {
    const state = getState();
    const user = state.auth?.user;
    if (!user?.id) {
      return { watchlist: [], watched: [] };
    }
    const [watchlist, watched] = await Promise.all([
      getWatchlist(user.id),
      getWatched(user.id),
    ]);
    return { watchlist, watched };
  }
);

let initialState = {
  watchlist: [],
  watched: [],
  watchlistLoading: false,
  watchedLoading: false,
  message: null,
  status: null,
};

const saveSlice = createSlice({
  name: "saveSlice",
  initialState,
  reducers: {
    getAllUserList: (state, action) => { state.watchlist = action.payload.watchlist || []; state.watched = action.payload.watched || []; },
    removeAllUsersList: (state) => { state.watchlist = []; state.watched = []; }
  },
  extraReducers: (builder) => {
    builder.addCase(AsyncAddToWatchlist.pending, (state, action) => {
      state.watchlistLoading = true;
    }).addCase(AsyncAddToWatchlist.fulfilled, (state, action) => {
      state.watchlistLoading = false;
      if (action.payload.status == 0) {
        state.status = action.payload.status;
        state.message = action.payload.message;
      } else {
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.watchlist = [action.payload.data, ...state.watchlist]
      }
    }).addCase(AsyncRemoveFromWatchlist.pending, (state, action) => {
      state.watchlistLoading = true;
    }).addCase(AsyncRemoveFromWatchlist.fulfilled, (state, action) => {
      state.watchlistLoading = false;
      state.status = action.payload.status;
      if (action.payload.status == 0) {
        state.message = action.payload.message;
      } else {
        state.message = action.payload.message;
        state.watchlist = state.watchlist.filter((element) => element.id !== action.payload.data)
      }
    }).addCase(AsyncAddToWatched.pending, (state, action) => {
      state.watchedLoading = true;
    }).addCase(AsyncAddToWatched.fulfilled, (state, action) => {
      state.watchedLoading = false;
      state.status = action.payload.status;
      if (action.payload.status == 0) {
        state.message = action.payload.message;
      } else {
        state.message = action.payload.message;
        state.watched = [action.payload.data, ...state.watched]
      }
    }).addCase(AsyncRemoveFromWatched.pending, (state, action) => {
      state.watchedLoading = true;
    }).addCase(AsyncRemoveFromWatched.fulfilled, (state, action) => {
      state.watchedLoading = false;
      state.status = action.payload.status;
      if (action.payload.status == 0) {
        state.message = action.payload.message;
      } else {
        state.message = action.payload.message;
        state.watched = state.watched.filter((element) => element.id !== action.payload.data)
      }
    }).addCase(initializeUserLists.pending, (state) => {
      state.watchlistLoading = true;
      state.watchedLoading = true;
    }).addCase(initializeUserLists.fulfilled, (state, action) => {
      state.watchlistLoading = false;
      state.watchedLoading = false;
      state.watchlist = action.payload.watchlist || [];
      state.watched = action.payload.watched || [];
    })
  }
});

export const selectSaveSliceStatus = (state) => state.saveReducer.status;
export const selectWatchlistLoading = (state) => state.saveReducer.watchlistLoading;
export const selectWatchedLoading = (state) => state.saveReducer.watchedLoading;
export const selectSaveSliceMessage = (state) => state.saveReducer.message;

export const selectWatchlist = (state) => state.saveReducer.watchlist;
export const selectWatched = (state) => state.saveReducer.watched;

export const { removeAllUsersList, getAllUserList } = saveSlice.actions;
export default saveSlice.reducer;
