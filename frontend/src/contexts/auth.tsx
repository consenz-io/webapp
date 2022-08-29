import { useAuth0 } from '@auth0/auth0-react';
import { createContext, useEffect, useState } from 'react';
import { IAuthContext, IFCProps } from 'types';

const AuthContext = createContext<IAuthContext>({ logout: () => ({}) });

const AuthProvider = ({ children }: IFCProps) => {
  const [jwt, setJwt] = useState<string>();
  const [userRole, setUserRole] = useState<string>('');
  const {
    getAccessTokenSilently,
    logout: logoutAuth0,
    loginWithRedirect,
    getIdTokenClaims,
  } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently()
      .then((token) => {
        setJwt(token);
      })
      .catch(() => loginWithRedirect());
    getIdTokenClaims().then((idClaims) => {
      if (idClaims) {
        setUserRole(idClaims.role || userRole || '');
      }
    });
  }, [getAccessTokenSilently, loginWithRedirect, getIdTokenClaims]);

  function logout(): void {
    setJwt(undefined);
    logoutAuth0({ returnTo: window.location.origin });
  }

  const authContextState: IAuthContext = {
    jwt,
    logout,
    role: userRole,
  };
  return <AuthContext.Provider value={authContextState}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
