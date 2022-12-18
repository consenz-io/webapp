import { createContext, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeModeType } from 'types';
import { useTranslation } from 'react-i18next';
import { createTheme, CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { getDesignTokens } from 'theme';

interface SettingsContext {
  isRTL: boolean;
  colorMode: ThemeModeType;
  setColorMode: (colorMode: ThemeModeType) => void;
  language: string;
  setLanguage: (language: string) => void;
}

const SettingsContext = createContext<SettingsContext>({} as SettingsContext);

const SettingsProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);
  const [colorMode, setColorMode] = useState<ThemeModeType>(ThemeModeType.DARK);
  const [language, setLanguage] = useState('en');
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
    const isRTL = language === 'he' || language === 'ar';
    setIsRTL(isRTL);
    document.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, i18n]);

  const theme = useMemo(() => createTheme(getDesignTokens(colorMode, isRTL)), [colorMode, isRTL]);

  const rotateColor = useCallback(
    async (e: globalThis.KeyboardEvent) => {
      if (e.key === '~') {
        setColorMode(colorMode === ThemeModeType.DARK ? ThemeModeType.LIGHT : ThemeModeType.DARK);
      }
    },
    [colorMode]
  );

  useEffect(() => {
    window.addEventListener('keydown', rotateColor);

    return () => {
      window.removeEventListener('keydown', rotateColor);
    };
  }, [rotateColor]);

  return (
    <SettingsContext.Provider
      value={{
        isRTL,
        colorMode,
        setColorMode,
        language,
        setLanguage,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <SCThemeProvider theme={theme}>{children}</SCThemeProvider>
      </MuiThemeProvider>
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, SettingsContext };
