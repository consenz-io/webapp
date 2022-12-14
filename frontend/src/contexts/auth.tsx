import { useAuth0 } from '@auth0/auth0-react';
import { createContext, useEffect, useState } from 'react';
import { IFCProps } from 'types';

interface AuthContext {
  jwt?: string;
  loginWithRedirect: () => void;
  logout: () => void;
  role?: string;
}
const AuthContext = createContext<AuthContext>({
  logout: () => ({}),
  loginWithRedirect: () => ({}),
});

const AuthProvider = ({ children }: IFCProps) => {
  const [jwt, setJwt] = useState<string>();
  const [userRole, setUserRole] = useState<string>('');
  const {
    getAccessTokenSilently,
    isLoading,
    logout: logoutAuth0,
    getIdTokenClaims,
    loginWithRedirect,
    isAuthenticated,
  } = useAuth0();

  useEffect(() => {
    if (isLoading || !isAuthenticated) {
      return;
    }
    getAccessTokenSilently().then((token) => {
      setJwt(token);
    });
    getIdTokenClaims()
      .then((idClaims) => {
        if (idClaims) {
          setUserRole(idClaims.role || userRole || '');
        }
      })
      .catch(() => {
        sessionStorage.setItem('lastUrl', window.location.pathname);
        loginWithRedirect();
      });
  }, [
    loginWithRedirect,
    getAccessTokenSilently,
    isLoading,
    getIdTokenClaims,
    userRole,
    isAuthenticated,
  ]);

  function logout(): void {
    setJwt(undefined);
    sessionStorage.setItem('lastUrl', window.location.pathname);
    logoutAuth0({ returnTo: window.location.origin });
  }

  const authContextState: AuthContext = {
    jwt,
    loginWithRedirect: () => {
      if (isAuthenticated || isLoading) {
        return;
      }
      loginWithRedirect();
    },
    logout,
    role: userRole,
  };
  return <AuthContext.Provider value={authContextState}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
