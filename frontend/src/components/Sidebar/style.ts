import styled from 'styled-components';
import { Drawer as MuiDrawer } from '@mui/material';

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
