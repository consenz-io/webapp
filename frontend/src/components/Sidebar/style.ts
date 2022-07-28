import styled from 'styled-components';
import { Drawer as MuiDrawer, ListItemButton as MuiListItemButton } from '@mui/material';

export const Drawer = styled(MuiDrawer)`
  && {
    .MuiDrawer-paper {
      width: 15rem;
      border: none;
      background: ${(props) => props.theme.palette.background.sidebar};
      left: ${(props) => (props.theme.direction === 'rtl' ? 'auto' : '0')};
    }
  }
`;

export const Container = styled.div`
  display: flex;
`;

export const LogoContainer = styled.div`
  padding: 1.25rem 1rem;
`;

export const Content = styled.div`
  flex: 1;
`;

export const ListItemButton = styled(MuiListItemButton)`
  && {
    .MuiListItemText-root,
    .MuiListItemIcon-root {
      color: ${(props) =>
        props.selected ? props.theme.palette.text.primary : props.theme.palette.text.secondary};
    }
  }
  &.Mui-selected {
    background-color: ${(props) => props.theme.palette.background.default} !important;
  }
`;
