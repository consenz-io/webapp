import { createContext, useState, FC } from "react";
import { FCProps, IDataContext } from "./types";

export const defaultState: IDataContext = {
  globalIsItGood: false,
  globalIsRTL: false,
};

const DataContext = createContext<IDataContext>(defaultState);

const DataProvider :FC<FCProps> = ({ children }) => {
  const [globalIsItGood, setGlobalIsItGood] = useState(defaultState.globalIsItGood);
  const [globalIsRTL, setGlobalIsRTL] = useState(defaultState.globalIsItGood);

  const toggleGlobalIsItGood = () => {
    setGlobalIsItGood(!globalIsItGood);
  };

  const toggleGlobalIsRTL = () => {
    setGlobalIsRTL(!globalIsRTL);
  };

  const dataState = {
    globalIsItGood,
    globalIsRTL,
    toggleGlobalIsItGood,
    toggleGlobalIsRTL,
  };

  return (
    <DataContext.Provider value={dataState}>{children}</DataContext.Provider>
  );
};

export { DataContext, DataProvider };
