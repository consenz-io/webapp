import styled from 'styled-components';

export const Wrapper = styled.div`
  ${(props) => props.theme.breakpoints.up('md')} {
    width: calc(100% - 15rem);
    margin-left: ${(props) => (props.theme.direction === 'rtl' ? 'auto' : '15rem')};
    margin-right: ${(props) => (props.theme.direction === 'rtl' ? '15rem' : 'auto')};
  }
  padding: 0rem 1rem;
  height: 100vh;
`;
