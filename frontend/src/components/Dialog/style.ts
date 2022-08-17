import styled from 'styled-components';
import { TextField, Button, DialogTitle, IconButton, DialogActions } from '@mui/material';

export const DialogInput = styled(TextField)`
  && {
    border-radius: 4px;
    border: solid 1px #565d68;
    background-color: rgba(0, 0, 0, 0.08);
    font-size: 16px;
    font-family: Lato;
    color: #adb2b8;
    width: 88%;
    height: 42px;
    margin-left: 6%;
  }
`;

export const InputWrapper = styled.div`
  && {
    .MuiOutlinedInput-root {
      height: 100%;
    }
  }
`;

export const DialogButton = styled(Button)`
  && {
    width: 79px;
    height: 40px;
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
    padding: 1rem 2rem;
    margin: 1%;
  }
`;
