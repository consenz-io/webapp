import styled from "styled-components";

export const MainWelcome = styled.div`
  width: 100vw;
  height: 100vh;
  /* width: 1440px; */
  /* height: 1024px; */
  /* flex-grow: 0; */
  /* padding: 24px 32px 511px; */
  /* background-color: var(--main-bg); */
  background-color: #333842;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const ContentLine = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ConsenzSymbol = styled.div`
  position: absolute;
  top: 5%;
  left: 2%;
  color: white;
  font-size: 22px;
  font-weight: bold;
`;
