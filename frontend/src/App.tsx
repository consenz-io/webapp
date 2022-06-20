import { useMemo, useState } from "react";
import { AuthProvider } from "./services";
import "./App.css";
import { DataProvider } from "store";
import { RoutesProvider } from "./routing";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { getDesignTokens, ColorModeContext } from "theme/theme";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { ThemeModeType } from "types";
import { Auth0Provider } from "@auth0/auth0-react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";

const AuthorizedApolloProvider = ({ children }: any) => {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    const httpLink = createHttpLink({
      uri: hasuraUri,
    });

    const authLink = setContext(async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        return {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      } else {
        return {};
      }
    });

    const apolloClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      connectToDevTools: true,
    });

    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
  }
};

const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID || "clientid";
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN || "domain";

const hasuraUri = "http://localhost:8080/v1/graphql";

const App = () => {
  const [mode, setMode] = useState<ThemeModeType>(ThemeModeType.LIGHT);

  const colorModeState = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === ThemeModeType.LIGHT
            ? ThemeModeType.DARK
            : ThemeModeType.LIGHT
        );
      },
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
      audience="hasura"
    >
      <AuthorizedApolloProvider>
        <DataProvider>
          <ColorModeContext.Provider value={colorModeState}>
            <MuiThemeProvider theme={theme}>
              <StyledThemeProvider theme={theme}>
                <AuthProvider>
                  <RoutesProvider />
                </AuthProvider>
              </StyledThemeProvider>
            </MuiThemeProvider>
          </ColorModeContext.Provider>
        </DataProvider>
      </AuthorizedApolloProvider>
    </Auth0Provider>
  );
};

export default App;
