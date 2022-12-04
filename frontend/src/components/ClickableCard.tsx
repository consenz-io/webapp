import { Card } from '@mui/material';
import styled from 'styled-components';

export const ClickableCard = styled(Card)`
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    box-shadow: 0 0 8px ${(props) => props.theme.palette.background.border};
  }
`;
