import { useContext, useMemo, useState } from "react";
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
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import { createHttpLink } from "@apollo/client";
import { ThemeModeType } from "types";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthContext } from "services";

const AUTH0_CLIENT_ID: string = process.env.REACT_APP_AUTH0_CLIENT_ID!;
const AUTH0_DOMAIN: string = process.env.REACT_APP_AUTH0_DOMAIN!;
const hasuraUri = "http://localhost:8080/v1/graphql";

const App = () => {
  const [mode, setMode] = useState<ThemeModeType>(ThemeModeType.DARK);
  const authContext = useContext(AuthContext);
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
          authContext?.setJwt(token);
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
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
      audience="hasura"
    >
      <DataProvider>
        <ColorModeContext.Provider value={colorModeState}>
          <MuiThemeProvider theme={theme}>
            <StyledThemeProvider theme={theme}>
              <AuthProvider>
                <AuthorizedApolloProvider>
                  <RoutesProvider />
                </AuthorizedApolloProvider>
              </AuthProvider>
            </StyledThemeProvider>
          </MuiThemeProvider>
        </ColorModeContext.Provider>
      </DataProvider>
    </Auth0Provider>
  );
};

export default App;
