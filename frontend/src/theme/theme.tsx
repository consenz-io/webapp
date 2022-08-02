import { ThemeModeType } from 'types/misc';
import { createContext } from 'react';
import { ThemeOptions } from '@mui/material';

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    category: true;
  }
}

export const getDesignTokens: (mode: ThemeModeType, isRTL: boolean) => ThemeOptions = (
  mode,
  isRTL
) => {
  return {
    direction: isRTL ? 'rtl' : 'ltr',
    typography: {
      fontFamily: 'Lato, Assistant, sans-serif',
      allVariants: {
        textAlign: isRTL ? 'right' : 'left',
      },
      h1: {
        fontSize: '2rem',
        fontWeight: 'bold',
      },
      h2: {
        fontSize: '1.625rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.1rem',
        fontWeight: 600,
      },
      h6: {
        fontSize: '0.875rem',
        fontWeight: 600,
        color: '#96989D',
      },
      caption: {
        fontSize: '0.75rem',
        color: '#bdbdbd',
      },
    },
    components: {
      MuiCard: {
        defaultProps: {
          variant: 'outlined',
        },
        styleOverrides: {
          root: {
            borderRadius: '8px',
          },
        },
      },
      MuiListSubheader: {
        styleOverrides: {
          root: {
            background: 'none',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            margin: '2px 4px',
            borderRadius: 8,
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 'unset',
            marginInlineEnd: '1rem',
          },
        },
      },
      MuiChip: {
        defaultProps: {
          variant: 'category',
        },
        variants: [{ props: { variant: 'category' }, style: { borderRadius: 4 } }],
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
            color: '#fff',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            padding: '8px 16px',
            ':hover': {
              background: mode === ThemeModeType.LIGHT ? 'primary' : '#686d73',
            },
          },
          contained: {
            background: mode === ThemeModeType.LIGHT ? 'primary' : '#3f4550',
          },
          startIcon: {
            marginInlineStart: '-4px',
            marginInlineEnd: '8px',
          },
        },
      },
    },
    palette: {
      mode,
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
              default: '#F5F7FA',
              sidebar: '#FCFCFD',
              capital: '#4c67f6',
              border: '#E3E3E3',
              active: '#F8EFFF',
            },
            text: {
              primary: '#000000',
              secondary: '#ADB2B8',
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
              sidebar: '#2C2E33',
              active: '#333842',
              border: '#595f68',
              default: '#333842',
              capital: '#4c67f6',
            },
            text: {
              primary: '#ffffff',
              secondary: '#ADB2B8',
            },
          }),
    },
  };
};

export const ColorModeAndDirectionContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => {},
  mode: ThemeModeType.LIGHT,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleDirection: () => {},
  isRTL: false,
});
