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

  const toggleLanguage = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === '`') {
        if (i18n.language === 'en') {
          i18n.changeLanguage('he');
          setIsRTL(true);
        } else {
          setIsRTL(false);
          i18n.changeLanguage('en');
        }
      } else if (e.key === '~') {
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
    window.addEventListener('keydown', toggleLanguage);

    return () => {
      window.removeEventListener('keydown', toggleLanguage);
    };
  }, [toggleLanguage]);

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
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
      audience="hasura"
    >
      <ColorModeAndDirectionContext.Provider value={colorModeAndDirectionState}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <StyledThemeProvider theme={theme}>
            <AuthProvider>
              <DataProvider>
                <Box>
                  <RoutesProvider />
                </Box>
              </DataProvider>
            </AuthProvider>
          </StyledThemeProvider>
        </MuiThemeProvider>
      </ColorModeAndDirectionContext.Provider>
    </Auth0Provider>
  );
};

export default App;
