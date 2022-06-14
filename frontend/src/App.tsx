import { AuthProvider } from "./services";
import "./App.css";
import { DataProvider } from "store";
import { RoutesProvider } from "./routing";
import { ThemeProvider } from "@mui/material/styles";
import { getDesignTokens, ColorModeContext } from "theme/theme";
import { useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeModeType } from "types";
import { Auth0Provider } from "@auth0/auth0-react";

const App = () => {
  const [mode, setMode] = useState<ThemeModeType>(ThemeModeType.LIGHT);
  const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID || "";
  const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN || "";
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
        <ThemeProvider theme={theme}>
          <Auth0Provider
            domain={AUTH0_DOMAIN}
            clientId={AUTH0_CLIENT_ID}
            redirectUri={window.location.origin}
            cacheLocation="localstorage"
            audience="hasura"
          >
            <AuthProvider>
              <RoutesProvider />
            </AuthProvider>
          </Auth0Provider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </DataProvider>
  );
};

export default App;
