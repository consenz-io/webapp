import styled from 'styled-components';
import { Drawer as MuiDrawer, ListItemButton as MuiListItemButton } from '@mui/material';

export const Drawer = styled(MuiDrawer)`
  && {
    .MuiDrawer-paper {
      width: 15rem;
      border-${({ theme }) => (theme.direction === 'rtl' ? 'left' : 'right')}: 1px solid ${({
  theme,
}) => theme.palette.background.border};
  background: ${({ theme }) => theme.palette.background.sidebar};
      left: ${({ theme }) => (theme.direction === 'rtl' ? 'auto' : '0')};
    }
  }
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
    background-color: ${(props) => props.theme.palette.background.active} !important;
  }
`;
