import styled from "styled-components";
import { MenuItem, Button as MuiButton, Menu } from "@mui/material";

export const DropDownMenuButton = styled(MuiButton)`
  && {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: ${(props) => props.theme.palette.text.primary};
    padding: 0.68rem 1rem;
    border-bottom: 1px solid;
    border-radius: 0;
    border-top: 1px solid;
    border-color: ${(props) => props.theme.palette.background.border};
    text-transform: none;

    .MuiButton-endIcon {
      margin-left: ${(props) =>
        props.theme.direction === "rtl" ? "-4px" : "8px"};
      margin-right: ${(props) =>
        props.theme.direction === "rtl" ? "8px" : "-4px"};
      svg {
        font-size: 1.5rem;
      }
    }

    &:hover,
    &[aria-expanded] {
      background-color: ${(props) => props.theme.palette.background.active};
    }
  }
`;

export const DropDownMenuItem = styled(MenuItem)`
  && {
    font-size: 0.875rem;
    border-radius: 4px;
    padding: 0.68rem 1rem;

    &:hover {
      background-color: ${(props) => props.theme.palette.background.active};
    }
  }
`;

export const DropDownMenu = styled(Menu)`
  && {
    .MuiPaper-root {
      max-width: none;
      min-width: 15rem;
      border: 1px solid ${(props) => props.theme.palette.background.border};
      background-color: ${(props) => props.theme.palette.background.sidebar};
      border-radius: 8px;
      margin-top: -5px;
    }
    ul {
      padding: 0.1875rem;
    }
  }
`;
