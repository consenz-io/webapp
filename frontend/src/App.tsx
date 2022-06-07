
import { DataProvider } from 'store';
import { ApiProvider } from './services';
import { RoutesProvider } from './routing';
import { ThemeProvider } from '@mui/material/styles';
import { getDesignTokens, ColorModeContext } from 'theme/theme';
import { useMemo, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeModeType } from 'types';

const App = () => {
  const [mode, setMode] = useState<ThemeModeType>(ThemeModeType.LIGHT);
  
  const colorModeState = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === ThemeModeType.LIGHT ? ThemeModeType.DARK : ThemeModeType.LIGHT));
      },
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
     createTheme(getDesignTokens(mode)),
    [mode],
  );

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