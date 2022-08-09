import styled from 'styled-components';
import { Dialog, TextField, Button, DialogTitle, IconButton, DialogActions } from '@mui/material';

export const DialogElement = styled(Dialog)`
  && {
  }
`;

export const DialogInput = styled(TextField)`
  && {
    border-radius: 4px;
    border: solid 1px #565d68;
    background-color: rgba(0, 0, 0, 0.08);
    font-size: 16px;
    font-family: Lato;
    color: #adb2b8;
    height: 42px;
    width: 90%;
    margin: auto;
  }
`;

export const DialogButton = styled(Button)`
  && {
    width: 79px;
    height: 40px;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    border-radius: 8px;
    background-color: #8d54ea;
  }
`;

export const DialogMainTitle = styled(DialogTitle)`
  && {
    font-family: Lato;
    font-size: 1.2rem;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.09;
    letter-spacing: normal;
    text-align: left;
    color: white;
    display: inline;
  }
`;

export const CloseButton = styled(IconButton)`
  && {
    width: 50px;
    height: 50px;
  }
`;

export const ActionsContainer = styled(DialogActions)`
  && {
    display: flex;
    justify-content: flex-end;
    padding: 2rem;
    margin: 1% 3%;
  }
`;
