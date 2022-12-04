import styled from 'styled-components';

export const Wrapper = styled.div`
  ${(props) => props.theme.breakpoints.up('md')} {
    width: calc(100% - 15rem);
    margin-left: ${(props) => (props.theme.direction === 'rtl' ? 'auto' : '15rem')};
    margin-right: ${(props) => (props.theme.direction === 'rtl' ? '15rem' : 'auto')};
    padding: 1rem 0.5rem;
  }
  padding: 0.5rem;
  height: 100vh;
`;
