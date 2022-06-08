import { createContext, FC, useState } from "react";
import { isVideoExist } from "./youtube";
import { IApiContext, FCProps } from "./types";

const ApiContext = createContext<IApiContext | null>(null);

const ApiProvider: FC<FCProps> = ({ children }) => {
  const apiState: IApiContext = {
    isVideoExist,
  };

  return <ApiContext.Provider value={apiState}>{children}</ApiContext.Provider>;
};

const AuthContext = createContext<any | null>(null);

const AuthProvider = ({ children }: any) => {
  const [jwt, setJwt] = useState("sample_jwt");
  const storeJwt = (jwt: string) => {
    setJwt(jwt);
  };
  const getJwt = (): string => {
    return jwt;
  };
  return (
    <AuthContext.Provider value={{ getJwt, storeJwt }}>
      {children}
    </AuthContext.Provider>
  );
};

export { ApiContext, ApiProvider, AuthProvider, AuthContext };
