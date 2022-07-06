import styled from "styled-components";

export const Main = styled.main`
  ${props => props.theme.breakpoints.up("md")} {
    width: calc(100% - 15rem);
    margin-left: ${props => props.theme.direction === "rtl" ? "auto" : "15rem"};
    margin-right: ${props => props.theme.direction === "rtl" ? "15rem" : "auto"};
  ;
 
  }
  padding: 1rem;
  background-color: #5b6987;
`;

export const Wrapper = styled.div``;
