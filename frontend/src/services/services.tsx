import { createContext, FC, useState } from "react";
import { FCProps, IAuthContext } from "./types";

const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider: FC<FCProps> = ({ children }: FCProps) => {
  const [jwt, setJwt] = useState("sample_jwt");

  const authContextState: IAuthContext = {
    setJwt,
    jwt
  };
  return (
    <AuthContext.Provider value={authContextState}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
