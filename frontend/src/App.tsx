import "./App.css";
import { DataProvider } from "store";
import { ApiProvider } from "./services";
import { RoutesProvider } from "./routing";
import { ThemeProvider } from "@mui/material/styles";
import { getDesignTokens, ColorModeContext } from "theme/theme";
import { useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeModeType } from "types";
import { setContext } from "@apollo/client/link/context";
import { Auth0Provider } from "@auth0/auth0-react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  createHttpLink,
} from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";

const HASURA_URL = "http://localhost:8080/v1/graphql";
const AuthorizedApolloProvider = ({ children }: any) => {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    const httpLink = createHttpLink({
      uri: HASURA_URL,
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
const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: HASURA_URL,
    }),
    cache: new InMemoryCache(),
  });
};

const App = () => {
  const [mode, setMode] = useState<ThemeModeType>(ThemeModeType.LIGHT);
  const [client] = useState(createApolloClient());

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
    <AuthorizedApolloProvider>
      <ApiProvider>
        <DataProvider>
          <ColorModeContext.Provider value={colorModeState}>
            <ThemeProvider theme={theme}>
              <RoutesProvider />
            </ThemeProvider>
          </ColorModeContext.Provider>
        </DataProvider>
      </ApiProvider>
    </AuthorizedApolloProvider>
  );
};

export default App;
