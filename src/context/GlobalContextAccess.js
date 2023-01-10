import { createContext, useReducer } from "react";

// initial data
const lists = {
  watchlist: [],
  watched: [],
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
      case "ADD_TO_WATCHED":
        return {
          ...list_obj,
          watched: [action.payload, ...list_obj.watched],
        };
      default:
        return list_obj;
    }
  };

  const [store, call] = useReducer(reducer, lists);

  //actions -> name of action and payload(data)
  const addToWatchList = (movie) => {
    call({ type: "ADD_TO_WATCHLIST", payload: movie });
  };
  const addToWatched = (movie) => {
    call({ type: "ADD_TO_WATCHED", payload: movie });
  };

  return (
    // globally available to access and use
    <GlobalContext.Provider
      value={{
        watchlist: store.watchlist,
        watched: store.watched,
        addToWatchList,
        addToWatched,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
