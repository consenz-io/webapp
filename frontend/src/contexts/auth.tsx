import { useAuth0 } from '@auth0/auth0-react';
import { createContext, useEffect, useState } from 'react';
import { IAuthContext, IFCProps } from 'types';

const AuthContext = createContext<IAuthContext>({ logout: () => ({}) });

const AuthProvider = ({ children }: IFCProps) => {
  const [jwt, setJwt] = useState<string>();
  const [userRole, setUserRole] = useState<string>('');
  const {
    getAccessTokenSilently,
    isLoading,
    logout: logoutAuth0,
    loginWithRedirect,
    getIdTokenClaims,
  } = useAuth0();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    getAccessTokenSilently()
      .then((token) => {
        setJwt(token);
      })
      .catch(() => {
        sessionStorage.setItem('lastUrl', window.location.pathname);
        loginWithRedirect();
      });
    getIdTokenClaims().then((idClaims) => {
      if (idClaims) {
        setUserRole(idClaims.role || userRole || '');
      }
    });
  }, [getAccessTokenSilently, isLoading, loginWithRedirect, getIdTokenClaims, userRole]);

  function logout(): void {
    setJwt(undefined);
    sessionStorage.setItem('lastUrl', window.location.pathname);
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
