import styled from "styled-components";

export const MainLogin = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 32px;
`;

export const FormLogin = styled.form`
  order: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
`;

export const ParagraphLogin = styled.p`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
`;

export const FormLableLogin = styled.label`
  font-family: "Lato";
  color: #adb2b8;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 22px;
`;

export const InputLogin = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 360px;
  height: 42px;
  background: #292d36;
  border: 1px solid #595f68;
  border-radius: 4px;
`;

export const SigninButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  gap: 10px;
  width: 360px;
  height: 48px;
  background: #6d31dc;
  border-radius: 8px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: white;
`;
