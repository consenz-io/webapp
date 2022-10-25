import styled from 'styled-components';
import { SvgIcon } from '@mui/material';

export default styled(SvgIcon)`
  svg path {
    fill: ${(props) => props.htmlColor};
  }
`;
