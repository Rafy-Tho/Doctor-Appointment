import { createContext, useContext } from 'react';
import { doctors } from '../assets/assets_frontend/assets.js';

export const AppContext = createContext();
function AppContextProvider({ children }) {
  const value = {
    doctors,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
