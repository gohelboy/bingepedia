import { createContext, useReducer, useEffect } from "react";

// initial data
const lists = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};

//create context to use globally
export const GlobalContext = createContext(lists);

// create global provider function
export const GlobalProvider = (props) => {
  //reducer
  const reducer = (list_obj, action) => {
    switch (action.type) {
      case "ADD_TO_WATCHLIST":
        return {
          ...list_obj,
          watchlist: [action.payload, ...list_obj.watchlist],
        };
      case "REMOVE_FROM_WATCHEDLIST":
        return {
          ...list_obj,
          watchlist: list_obj.watchlist.filter(
            (obj) => obj.id !== action.payload
          ),
        };
      case "ADD_TO_WATCHED":
        return {
          ...list_obj,
          watched: [action.payload, ...list_obj.watched],
        };
      case "REMOVE_FROM_WATCHED":
        return {
          ...list_obj,
          watched: list_obj.watched.filter((obj) => obj.id !== action.payload),
        };
      default:
        return list_obj;
    }
  };

  const [store, call] = useReducer(reducer, lists);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(store.watchlist));
    localStorage.setItem("watched", JSON.stringify(store.watched));
    // eslint-disable-next-line
  }, [store]);

  //actions -> name of action and payload(data)
  const addToWatchList = (movie) => {
    call({ type: "ADD_TO_WATCHLIST", payload: movie });
  };
  const addToWatched = (movie) => {
    call({ type: "ADD_TO_WATCHED", payload: movie });
  };

  const removeFromWatchlist = (id) => {
    call({ type: "REMOVE_FROM_WATCHEDLIST", payload: id });
  };

  const removeFromWatched = (id) => {
    call({ type: "REMOVE_FROM_WATCHED", payload: id });
  };

  return (
    // globally available to access and use
    <GlobalContext.Provider
      value={{
        watchlist: store.watchlist,
        watched: store.watched,
        addToWatchList,
        addToWatched,
        removeFromWatchlist,
        removeFromWatched,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
