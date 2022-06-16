import { useMemo, useState } from "react";
import { AuthProvider } from "./services";
import "./App.css";
import { DataProvider } from "store";
import { RoutesProvider } from "./routing";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { getDesignTokens, ColorModeContext } from "theme/theme";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeModeType } from "types";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://hasura-try-yishain11.hasura.app/v1/graphql",
      headers: {
        "x-hasura-admin-secret": "",
        "Content-Type": "application/json",
      },
    }),
    cache: new InMemoryCache(),
  });
};

const App = () => {
  const [mode, setMode] = useState<ThemeModeType>(ThemeModeType.LIGHT);
  const [client] = useState(createApolloClient()); //TODO: remove?

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
  );
};

export default App;
