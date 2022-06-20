import { createContext, useState, FC } from "react";
import { FCProps, IDataContext } from "./types";

export const defaultState: IDataContext = {
  globalIsItGood: false,
};

const DataContext = createContext<IDataContext>(defaultState);

const DataProvider:FC<FCProps> = ({ children }) => {
  const [globalIsItGood, setGlobalIsItGood] = useState(defaultState.globalIsItGood);

  const toggleGlobalIsItGood = () => {
    setGlobalIsItGood(!globalIsItGood);
  };
  
  const dataState = {
    globalIsItGood,
    toggleGlobalIsItGood,
  };

  return (
    <DataContext.Provider value={dataState}>{children}</DataContext.Provider>
  );
};

export { DataContext, DataProvider };