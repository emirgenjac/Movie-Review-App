import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [mainMovies, setMainMovies] = useState([])
  const [watchlist, setWatchlist] = useState([]);


  const contextValue = {
    mainMovies,
    setMainMovies,
    watchlist,
    setWatchlist
  };


  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }

  return context;
}

export { AppProvider, useAppContext}
