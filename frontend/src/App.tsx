import { useMemo, useState } from "react";
import { AuthProvider, RoutesProvider } from "./contexts";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { getDesignTokens, ColorModeAndDirectionContext } from "theme/theme";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { ThemeModeType } from "types/misc";
import { Auth0Provider } from "@auth0/auth0-react";
import { apiUrl, auth0ClientId, auth0Domain } from "utils/constants";
import { DataProvider } from "contexts/data";

const App = () => {
  const [mode, setMode] = useState<ThemeModeType>(ThemeModeType.DARK);
  const [isRTL, setIsRTL] = useState(false);
  const apolloClient = new ApolloClient({
    uri: apiUrl,
    cache: new InMemoryCache()    
  });

  const colorModeAndDirectionState = useMemo(
    () => ({
      isRTL,
      mode,
      toggleColorMode: () => {
        console.info("toggle");
        setMode((prevMode) =>
          prevMode === ThemeModeType.LIGHT
            ? ThemeModeType.DARK
            : ThemeModeType.LIGHT
        );
      },
      toggleDirection: () => {
        setIsRTL((prevMode) => !prevMode);
      },
    }),
    [mode, isRTL]
  );

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode, isRTL)),
    [mode, isRTL]
  );

  return (
    <div className="container">
      <Auth0Provider
        domain={auth0Domain}
        clientId={auth0ClientId}
        redirectUri={window.location.origin}
        cacheLocation="localstorage"
        audience="hasura"
      >
        <ApolloProvider client={apolloClient}>
          <ColorModeAndDirectionContext.Provider
            value={colorModeAndDirectionState}
          >
            <MuiThemeProvider theme={theme}>
              <StyledThemeProvider theme={theme}>
                <AuthProvider>
                  <DataProvider>
                    <RoutesProvider />
                  </DataProvider>
                </AuthProvider>
              </StyledThemeProvider>
            </MuiThemeProvider>
          </ColorModeAndDirectionContext.Provider>
        </ApolloProvider>
      </Auth0Provider>
    </div>
  );
};

export default App;
