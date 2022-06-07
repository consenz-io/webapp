import { ThemeModeType } from 'types';
import { createContext } from 'react';

export const getDesignTokens = (mode: ThemeModeType) => ({
  palette: {
    palletMode: mode,
    ...(mode === ThemeModeType.LIGHT
      ? {
          primary: {
            main: '#620EE5',
          },
          secondary: {
            main: '#f50057',
          },
          background: {
            paper: '#fcfcfd',
            default: '#ffffff',
          },
          text: {
            secondary: '#ADB2B8',
            primary: '#000000',
          },
        }
      : {
        primary: {
          main: '#8d54ea',
        },
        secondary: {
          main: '#f50057',
        },
        background: {
          paper: '#3f4550',
          default: '#292D36',
        },
        text: {
          secondary: '#ADB2B8',
        },
      }),
  },
});

export const ColorModeContext = createContext({ toggleColorMode: () => {}, mode: ThemeModeType.LIGHT });