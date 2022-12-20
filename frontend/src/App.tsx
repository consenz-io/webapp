import { FC } from 'react';
import { AuthProvider, RoutesProvider, SettingsProvider } from './contexts';
import './App.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0ClientId, auth0Domain } from 'utils/constants';
import { UserProvider } from 'contexts/user';
import { Box } from '@mui/material';

const App: FC = () => {
  return (
    <SettingsProvider>
      <Auth0Provider
        domain={auth0Domain}
        clientId={auth0ClientId}
        useRefreshTokens
        redirectUri={window.location.origin}
        cacheLocation="localstorage"
        audience="hasura"
      >
        <AuthProvider>
          <UserProvider>
            <Box>
              <RoutesProvider />
            </Box>
          </UserProvider>
        </AuthProvider>
      </Auth0Provider>
    </SettingsProvider>
  );
};

export default App;
