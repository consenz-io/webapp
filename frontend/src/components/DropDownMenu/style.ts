// noinspection SpellCheckingInspection

import styled from 'styled-components';
import { Menu, MenuItem } from '@mui/material';
import { DropDownMenuButton as Button } from './parts';
import { VariantType } from 'types';

interface Props {
  stylevariant?: VariantType;
  bgcolor?: string;
}

export const DropDownMenuButton = styled(Button)<Props>`
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
      props.stylevariant === VariantType.SECONDARY &&
      `
         font-weight: 600;
         background-color: ${props.bgcolor || props.theme.palette.background.paper};
         border-radius: 8px;
         height: 40px;
         
         &:hover,
         &[aria-expanded] {
            background-color: ${props.theme.palette.background.paper};
         }
      `}

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

export const DropDownMenu = styled(Menu)<Props>`
  && {
    .MuiPaper-root {
      max-width: none;
      min-width: 12rem;
      border: 1px solid ${(props) => props.theme.palette.background.border};
      background-color: ${(props) => props.theme.palette.background.sidebar};
      border-radius: 8px;
      margin-top: -5px;

      ${(props) =>
        props.stylevariant === VariantType.SECONDARY &&
        `
          border: 0;
          margin-top: 2px;
      `}

      ul {
        padding: 0.1875rem;
        ${(props) =>
          props.stylevariant === VariantType.PRIMARY &&
          `
         background-color: ${props.theme.palette.background.border};
      `}

        ${(props) =>
          props.stylevariant === VariantType.SECONDARY &&
          `
         background-color: ${props.theme.palette.background.dropdown};
         box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.16);
      `}
      }
    }
  }
`;

export const DropDownMenuItem = styled(MenuItem)<Props>`
  && {
    font-size: 0.875rem;
    border-radius: 4px;
    padding: 0.68rem 1rem;
    gap: 0.5rem;
    &:hover,
    &.Mui-selected {
      background-color: ${(props) => props.theme.palette.background.active};

      ${(props) =>
        props.stylevariant === VariantType.PRIMARY &&
        `
            background-color: ${props.theme.palette.background.border};
            &:hover {
              background-color: ${props.theme.palette.background.paper};
            }
      `}

      ${(props) =>
        props.stylevariant === VariantType.SECONDARY &&
        `
         background-color: ${props.theme.palette.background.paper};
         &:hover {
              background-color: ${props.theme.palette.background.paper};
         }
      `}
    }
  }
`;

export const BtnCapital = styled.span<Props>`
  text-transform: uppercase;
  font-size: 1.25rem;
  color: white;
  font-weight: 500;
  z-index: 1;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 2rem;
    height: 2rem;
    background-color: ${(props) => {
      if (props.color === 'main') {
        return props.theme.palette.primary.main;
      }
      return props.theme.palette.background.capital;
    }};
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
`;
