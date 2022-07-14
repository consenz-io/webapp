import { useMemo, useState } from "react";
import { AuthProvider } from "./services";
import "./App.css";
import { DataProvider } from "store";
import { RoutesProvider } from "./routing";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { getDesignTokens, ColorModeAndDirectionContext } from "theme/theme";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { ThemeModeType } from "types";
import { useTranslation } from "react-i18next";
import { Auth0Provider } from "@auth0/auth0-react";

const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID || "clientid";
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN || "domain";

const App = () => {
  const { i18n } = useTranslation();
  const [mode, setMode] = useState<ThemeModeType>(ThemeModeType.DARK);
  const [isRTL, setIsRTL] = useState(false);

  const colorModeAndDirectionState = useMemo(
    () => ({
      isRTL,
      mode,
      toggleColorMode: () => {
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

  const toggleLanguage = (e:any) => {  // Not sure why e:KeyboardEventHandler doesn't work, but it doesn't.
    // Check for backtick key pressed.
    if (e.keyCode === 192) {
      // Toggle language and ensure RTL if switching to Hebrew.
      if (i18n.language === "en") {
        i18n.changeLanguage("he");
        setIsRTL(true);
      } else {
        i18n.changeLanguage("en");
      }
    }
  };

  return (
    <div className="container" tabIndex={0} onKeyDown={toggleLanguage}>{/* tabIndex enables keyboard event listening on the div */}
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
        cacheLocation="localstorage"
        audience="hasura"
      >
        <DataProvider>
          <ColorModeAndDirectionContext.Provider
            value={colorModeAndDirectionState}
          >
            <MuiThemeProvider theme={theme}>
              <StyledThemeProvider theme={theme}>
                <AuthProvider>
                  <RoutesProvider />
                </AuthProvider>
              </StyledThemeProvider>
            </MuiThemeProvider>
          </ColorModeAndDirectionContext.Provider>
        </DataProvider>
      </Auth0Provider>
    </div>
  );
};

export default App;
