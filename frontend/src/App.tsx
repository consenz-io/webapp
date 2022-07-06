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

const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID || "clientid";
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN || "domain";

const App = () => {
  const [mode, setMode] = useState<ThemeModeType>(ThemeModeType.DARK);

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
    <div className="container">
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
                  <RoutesProvider />
                </AuthProvider>
              </StyledThemeProvider>
            </MuiThemeProvider>
          </ColorModeContext.Provider>
        </DataProvider>
      </Auth0Provider>
    </div>
  );
};

export default App;
