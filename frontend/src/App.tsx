/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AuthProvider, RoutesProvider } from './contexts';
import './App.css';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getDesignTokens, ColorModeAndDirectionContext } from 'theme/theme';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeModeType } from 'types/misc';
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0ClientId, auth0Domain } from 'utils/constants';
import { DataProvider } from 'contexts/data';
import { useTranslation } from 'react-i18next';
import { Box, CssBaseline } from '@mui/material';

const App: FC = () => {
  const [mode, setMode] = useState<ThemeModeType>(ThemeModeType.DARK);
  const [isRTL, setIsRTL] = useState(false);
  const { i18n } = useTranslation();

  const rotateLanguage = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === '`') {
        if (i18n.language === 'en') {
          i18n.changeLanguage('he');
          setIsRTL(true);
          return;
        }
        if (i18n.language === 'he') {
          i18n.changeLanguage('ar');
          return;
        }
        if (i18n.language === 'ar') {
          i18n.changeLanguage('en');
          setIsRTL(false);
          return;
        }
      }
      if (e.key === '~') {
        setMode(mode === ThemeModeType.DARK ? ThemeModeType.LIGHT : ThemeModeType.DARK);
        i18n.changeLanguage('en');
      }
    },
    [i18n, mode]
  );

  useEffect(() => {
    document.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  useEffect(() => {
    window.addEventListener('keydown', rotateLanguage);

    return () => {
      window.removeEventListener('keydown', rotateLanguage);
    };
  }, [rotateLanguage]);

  const colorModeAndDirectionState = useMemo(
    () => ({
      isRTL,
      mode,
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === ThemeModeType.LIGHT ? ThemeModeType.DARK : ThemeModeType.LIGHT
        );
      },
      toggleDirection: () => {
        setIsRTL((prevMode) => !prevMode);
      },
    }),
    [mode, isRTL]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode, isRTL)), [mode, isRTL]);

  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      useRefreshTokens
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
      audience="hasura"
    >
      <ColorModeAndDirectionContext.Provider value={colorModeAndDirectionState}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <StyledThemeProvider theme={theme}>
            {/* <AuthProvider> */}
            <DataProvider>
              <Box>
                <RoutesProvider />
              </Box>
            </DataProvider>
            {/* </AuthProvider> */}
          </StyledThemeProvider>
        </MuiThemeProvider>
      </ColorModeAndDirectionContext.Provider>
    </Auth0Provider>
  );
};

export default App;
