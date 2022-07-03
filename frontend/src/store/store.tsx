import { createContext, useState, FC } from "react";
import { FCProps, IDataContext, User } from "./types";

export const defaultState: IDataContext = {
  globalIsItGood: false,
  globalUser: {
    name: "",
    groups: [],
    currentGroup: 0
  },
};

const DataContext = createContext<IDataContext>(defaultState);

const DataProvider :FC<FCProps> = ({ children }) => {
  const [globalIsItGood, setGlobalIsItGood] = useState(defaultState.globalIsItGood);
  const [globalUser, setGlobalUser] = useState(defaultState.globalUser);

  const toggleGlobalIsItGood = () => {
    setGlobalIsItGood(!globalIsItGood);
  };

  const setGlobalUserData = (data: User) => {
    setGlobalUser(data);
  };

  const dataState = {
    globalIsItGood,
    toggleGlobalIsItGood,
    globalUser,
    setGlobalUserData,
  };

  return (
    <DataContext.Provider value={dataState}>{children}</DataContext.Provider>
  );
};

export { DataContext, DataProvider };
