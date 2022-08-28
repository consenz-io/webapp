import { Stack } from '@mui/material';
import styled from 'styled-components';

export const Card = styled(Stack)`
  && {
    width: 795px;
    height: 208px;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 4px;
    padding: 0;
    background-color: #3f4550;
    border-radius: 4px;
    margin-bottom: 5px;
  }
`;

export const SectionDataRow = styled(Stack)`
  && {
    padding: 1.71rem 4rem;
  }
`;

export const SectionColumn = styled(Stack)`
  flex-direction: 'column';
  width: '3.5rem';
`;
