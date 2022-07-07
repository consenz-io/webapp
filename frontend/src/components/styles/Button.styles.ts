import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

export const FooterButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  gap: 10px;
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  border: 1px solid #828282;
  border-radius: 8px;
  color: #fcfcfd;
  background: rgba(41, 45, 54, 0.5);
  width: 360px;
  height: 48px;
`;

export const MainDefaultBtn = styled(Button)`
  && {
    width: 9.5rem;
    border-radius: 8px;
    text-transform: capitalize;
    background-color: #36393f;
    font-weight: 600;
    color: white;
    &:hover {
      border-radius: 8px;
      background-color: #686d73;
    }
  }
`;

export const SymbolBtn = styled(Button)`
  && {
    display: flex;
    height: 2.57rem;
    width: 11.5rem;
    border-radius: 8px;
    padding: 0.6rem 0.5rem;
    background-color: #3f4550;
    text-transform: capitalize;
    color: white;
    font-family: Lato;
    font-size: 14px;
    font-weight: 600;
    &:hover {
      background-color: #686d73;
    }
  }
`;

export const OutlinedBtn = styled(Button)`
  && {
    width: 9.5rem;
    text-transform: capitalize;
    gap: 8px;
    border-radius: 8px;
    border: solid 1px white;
    background-color: #36393f;
    color: white;
    font-family: Lato;
    font-size: 14px;
    font-weight: 600;
    &:hover {
      gap: 8px;
      border-radius: 8px;
      border: solid 1px white;
      background-color: #4f545c;
    }
  }
`;

export const OutlinedSymbolBtn = styled(Button)`
  && {
    width: 11.5rem;
    height: 2.57rem;
    border-radius: 8px;
    text-transform: capitalize;
    border: solid 1px white;
    background-color: #36393f;
    color: white;
    font-family: Lato;
    font-size: 14px;
    font-weight: 600;
    &:hover {
      background-color: #4f545c;
    }
  }
`;

export const TextBtn = styled(Button)`
  && {
    width: 9.5rem;
    height: 2.64rem;
    text-transform: capitalize;
    border-radius: 8px;
    color: #c49eff;
    font-family: Lato;
    font-size: 14px;
    font-weight: 600;
    &:hover {
      background-color: #36393f;
    }
  }
`;

export const IconBtn = styled(IconButton)`
  && {
    width: 2.28rem;
    height: 2.28rem;
    &:hover {
      background-color: #4f545c;
    }
  }
`;
