import styled from 'styled-components';
import { Menu, MenuItem } from '@mui/material';
import { DropDownMenuButton as Button } from './parts';

export const DropDownMenuButton = styled(Button)`
  && {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: ${(props) => props.theme.palette.text.primary};
    padding: 0.68rem 1rem;
    ${(props) =>
      !props.isBorderHidden &&
      `
      border-bottom: 1px solid;
      border-top: 1px solid;
    `}
    border-color: ${(props) => props.theme.palette.background.border};
    border-radius: ${(props) => (props.isBorderHidden ? '4px' : '0')};
    text-transform: none;

    ${(props) =>
      props.isUser &&
      `
        padding-left: ${props.theme.direction === 'rtl' ? 'auto' : '3rem'};
        padding-right: ${props.theme.direction === 'rtl' ? '3rem' : 'auto'};
    `}

    .MuiButton-endIcon {
      margin-left: ${(props) => (props.theme.direction === 'rtl' ? '-4px' : '8px')};
      margin-right: ${(props) => (props.theme.direction === 'rtl' ? '8px' : '-4px')};

      svg {
        font-size: 1.5rem;
      }
    }

    &:hover,
    &[aria-expanded] {
      background-color: ${(props) => props.theme.palette.background.active};
    }

    ${(props) =>
      props.isUser &&
      `
        .capital {
          position: absolute;
          left: ${props.theme.direction === 'rtl' ? 'auto' : '1rem'};
          right: ${props.theme.direction === 'rtl' ? '1rem' : 'auto'};
        }
    `}
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

export const BtnCapital = styled.span`
  text-transform: uppercase;
  font-size: 1.25rem;
  font-weight: 500;
  z-index: 1;
  &:before {
    content: '';
    position: absolute;
    width: 2rem;
    height: 2rem;
    background-color: ${(props) => props.theme.palette.background.capital};
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
`;
