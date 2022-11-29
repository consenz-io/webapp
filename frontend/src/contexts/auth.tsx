/* eslint-disable @typescript-eslint/no-unused-vars */
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
    console.log('start log checking');
    console.log('isLoading', isLoading);

    if (isLoading) {
      return;
    }
    getAccessTokenSilently()
      .then((token) => {
        console.log('token', token);
        setJwt(token);
      })
      // .catch(loginWithRedirect);
      .catch(() => {
        console.log('not logged');
        setJwt(undefined);
        // loginWithRedirect();
        // window.location.replace(window.location.origin);
        return;
      });
    getIdTokenClaims().then((idClaims) => {
      if (idClaims) {
        setUserRole(idClaims.role || userRole || '');
      }
    });
  }, [isLoading, loginWithRedirect, getIdTokenClaims, userRole]);

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
