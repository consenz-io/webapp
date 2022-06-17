import styled from "styled-components";

export const Main = styled.main`
  ${props => props.theme.breakpoints.up("md")} {
    width: calc(100% - 15rem);
    margin-left: 15rem;
  }
  padding: 1rem;
  background-color: #5b6987;
`;

export const Wrapper = styled.div``;
