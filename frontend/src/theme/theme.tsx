import { ThemeModeType } from "types/misc";
import { createContext } from "react";
import { ThemeOptions } from "@mui/material";

export const getDesignTokens: (mode: ThemeModeType, isRTL: boolean) => ThemeOptions = (mode, isRTL) => {
  return {
    direction: isRTL ? "rtl" : "ltr",
    typography: {
      fontFamily: "Lato, Assistant, sans-serif",
      h1: {
        fontSize: "2rem",
        fontWeight: "bold",
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
            color: "#fff",
            textTransform: "capitalize",
            fontWeight: "bold",
            padding: "8px 16px",
            ":hover": {
              background: "#686d73",
            },
          },
          contained: {
            background: "#3f4550",
          },
          startIcon: {
            marginInlineStart: "-4px",
            marginInlineEnd: "8px",
          }
        }
      }
    },
    palette: {
      mode,
      ...(mode === ThemeModeType.LIGHT
        ? {
          primary: {
            main: "#620EE5",
          },
          secondary: {
            main: "#f50057",
          },
          background: {
            paper: "#fcfcfd",
            default: "#ffffff",
          },
          text: {
            primary: "#000000",
            secondary: "#ADB2B8",
          },
        }
        : {
          primary: {
            main: "#8d54ea",
          },
          secondary: {
            main: "#f50057",
          },
          background: {
            paper: "#3f4550",
            sidebar: "#2C2E33",
            active: "#333842",
            border: "#595f68",
            default: "#333842",
            capital: "#4c67f6"
          },
          text: {
            primary: "#ffffff",
            secondary: "#ADB2B8",
          },
        }),
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ColorModeAndDirectionContext = createContext({ toggleColorMode: () => {}, mode: ThemeModeType.LIGHT, toggleDirection: () => {}, isRTL: false });
