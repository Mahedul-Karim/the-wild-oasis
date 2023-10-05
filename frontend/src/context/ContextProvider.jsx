import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export const ContextProvider = function ({ children }) {
  const [user, setUser] = useState();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(()=>{
    if(darkMode){
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    }else{
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  })

  return (
    <Context.Provider value={{ user, setUser, darkMode, setDarkMode }}>
      {children}
    </Context.Provider>
  );
};

export const useCtx = function () {
  return useContext(Context);
};
