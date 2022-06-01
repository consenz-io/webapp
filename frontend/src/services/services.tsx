import { createContext, FC } from 'react';
import { isVideoExist } from './youtube'
import { IApiContext, FCProps } from './types'

const ApiContext = createContext<IApiContext | null>(null);

const ApiProvider:FC<FCProps> = ({ children }) => {
  const apiState:IApiContext = {
    isVideoExist,
  };

  return <ApiContext.Provider value={apiState}>{children}</ApiContext.Provider>;
};

export { ApiContext, ApiProvider };