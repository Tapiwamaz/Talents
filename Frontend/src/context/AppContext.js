import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState({})
    const [loggedIn,setLoggedIn] = useState(false);

  const contextValue = {
    user,
    loggedIn,
    setUser,
    setLoggedIn
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
