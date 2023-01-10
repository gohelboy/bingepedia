import { createContext, useReducer } from "react";
/* import Reducer from "./Reducer"; */

// initial data
const lists = {
  watchlist: [],
  watched: [],
};

//create context to use globally
export const GlobalContext = createContext(lists);

export const GlobalProvider = (props) => {
  //

  const reducer = (data, action) => {
    switch (action.type) {
      case "ADD_TO_WATCHLIST":
        return {
          ...data,
          watchlist: [action.payload, ...data.watchlist],
        };
      default:
        return data;
    }
    /* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
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
