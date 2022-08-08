import styled from 'styled-components';
import { Dialog, TextField } from '@mui/material';

export const DialogElement = styled(Dialog)`
  && {
  }
`;

export const DialogInput = styled(TextField)`
  && {
    border-radius: 4px;
    border: solid 1px #565d68;
    background-color: rgba(0, 0, 0, 0.08);
    margin: 1rem;
  }
`;
