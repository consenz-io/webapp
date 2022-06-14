import { AuthProvider } from "./services";
import "./App.css";
import { DataProvider } from "store";
import { RoutesProvider } from "./routing";
import { ThemeProvider } from "@mui/material/styles";
import { getDesignTokens, ColorModeContext } from "theme/theme";
import { useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeModeType } from "types";

const App = () => {
  const [mode, setMode] = useState<ThemeModeType>(ThemeModeType.LIGHT);

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
          <AuthProvider>
            <RoutesProvider />
          </AuthProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </DataProvider>
  );
};

export default App;
