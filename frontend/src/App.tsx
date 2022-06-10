import "./App.css";
import { DataProvider } from "store";
import { ApiProvider } from "./services";
import { RoutesProvider } from "./routing";
import { ThemeProvider } from "@mui/material/styles";
import { getDesignTokens, ColorModeContext } from "theme/theme";
import { useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeModeType } from "types";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://hasura-try-yishain11.hasura.app/v1/graphql",
      headers: {
        "x-hasura-admin-secret": ``,
        "Content-Type": "application/json",
      },
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
    <ApiProvider>
      <DataProvider>
        <ColorModeContext.Provider value={colorModeState}>
          <ThemeProvider theme={theme}>
            <RoutesProvider />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </DataProvider>
    </ApiProvider>
  );
};

export default App;
