import { createContext, FC, useState } from "react";
import { FCProps, IAuthContext } from "./types";

const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider: FC<FCProps> = ({ children }: any) => {
  const [jwt, setJwt] = useState("sample_jwt");
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

export { AuthProvider, AuthContext };
