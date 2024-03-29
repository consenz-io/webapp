import { useAuth0 } from '@auth0/auth0-react';
import { createContext, useEffect, useState } from 'react';
import { IFCProps } from 'types';
import { PostLoginActions } from 'types/misc';

interface AuthContext {
  jwt?: string;
  loginWithRedirect: (postLoginActions?: PostLoginActions) => void;
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
    logoutAuth0({ returnTo: window.location.origin });
  }

  const authContextState: AuthContext = {
    jwt,
    loginWithRedirect: (postLoginActions) => {
      if (isAuthenticated || isLoading) {
        return;
      }
      sessionStorage.setItem('postLoginActions', JSON.stringify(postLoginActions || {}));
      loginWithRedirect();
    },
    logout,
    role: userRole,
  };
  return <AuthContext.Provider value={authContextState}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
