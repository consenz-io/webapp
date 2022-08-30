import styled from "styled-components";
import { TextField, DialogActions, SvgIcon } from "@mui/material";

export const XIconWrapper = styled(SvgIcon)`
  svg path {
    fill: #adb2b8;
  }
`;

export const DialogInput = styled(TextField)`
  && {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.08);
    font-size: 16px;
    color: #adb2b8;
    height: 42px;
    width: 100%;
    margin: 0;
  }
`;

export const InputWrapper = styled.div`
  && {
    padding: 0 2rem;
    margin-bottom: 2rem;
    .MuiOutlinedInput-root {
      height: 100%;
    }
  }
`;

export const ActionsContainer = styled(DialogActions)`
  && {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 0 2rem;
    margin-bottom: 2rem;
  }
`;
