import { createContext, FC, useState } from "react";
import { isVideoExist } from "./youtube";
import { IApiContext, FCProps, IAuthContext } from "./types";

const ApiContext = createContext<IApiContext | null>(null);

const ApiProvider: FC<FCProps> = ({ children }) => {
  const apiState: IApiContext = {
    isVideoExist,
  };

  return <ApiContext.Provider value={apiState}>{children}</ApiContext.Provider>;
};

const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider: FC<FCProps> = ({ children }: any) => {
  const [jwt, setJwt] = useState("");
  const storeJwt = (jwt: string) => {
    setJwt(jwt);
  };
  const authContextState: IAuthContext = {
    storeJwt,
  };
  return (
    <AuthContext.Provider value={authContextState}>
      {children}
    </AuthContext.Provider>
  );
};

export { ApiContext, ApiProvider, AuthProvider, AuthContext };
