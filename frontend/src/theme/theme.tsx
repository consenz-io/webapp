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
      h4: {
        fontSize: '1rem',
        fontWeight: 600,
      },
      h6: {
        fontSize: '0.875rem',
        fontWeight: 600,
      },
      body2: {
        fontSize: '0.875rem',
      },
      caption: {
        fontSize: '0.75rem',
        color: '#bdbdbd',
      },
    },
    components: {
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 28,
            height: 16,
            padding: 0,
            display: 'flex',
            '&:active': {
              '& .MuiSwitch-thumb': {
                width: 15,
              },
              '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
              },
            },
            '& .MuiSwitch-switchBase': {
              padding: 2,
              '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                  opacity: 1,
                  backgroundColor: mode === ThemeModeType.DARK ? '#177ddc' : '#1890ff',
                },
              },
            },
            '& .MuiSwitch-thumb': {
              boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
              width: 12,
              height: 12,
              borderRadius: 6,
              transition: 'width 200',
            },
            '& .MuiSwitch-track': {
              borderRadius: 16 / 2,
              opacity: 1,
              backgroundColor:
                mode === ThemeModeType.DARK ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
              boxSizing: 'border-box',
            },
          },
        },
      },
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
          color: 'secondary',
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
            color: '#fff',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            padding: '8px 16px',
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
            success: {
              main: '#13bd76',
            },
            background: {
              paper: '#fcfcfd',
              default: '#F5F7FA',
              sidebar: '#FCFCFD',
              capital: '#4c67f6',
              border: '#E3E3E3',
              active: '#F8EFFF',
              dropdown: '#292d36',
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
              main: '#3f4550',
              dark: '#686d73',
            },
            success: {
              main: '#13bd76',
            },
            background: {
              paper: '#3f4550',
              sidebar: '#2C2E33',
              active: '#333842',
              border: '#595f68',
              default: '#333842',
              capital: '#4c67f6',
              dropdown: '#292d36',
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
