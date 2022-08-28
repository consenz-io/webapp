import { IconButton, Stack } from '@mui/material';
import styled from 'styled-components';

export const Card = styled(Stack)`
  && {
    width: 795px;
    height: 208px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: #3f4550;
    border-radius: 4px;
    margin-bottom: 10px;
    margin-left: 2rem;
  }
`;

export const SectionDataRow = styled(Stack)`
  && {
    gap: 10px;
    width: 100%;
  }
`;

export const SectionButtonsRow = styled(Stack)`
  && {
    height: 3.5rem;
    width: 100%;
    gap: 23px;
  }
`;

export const SectionDataColumn = styled(Stack)`
  && {
    height: 100%;
    width: 42rem;
    justify-content: center;
    padding: 1rem 1.5rem;
  }
`;
export const ButtonColumn = styled(Stack)`
  && {
    width: 4rem;
    justify-content: center;
    height: 3.5rem;
  }
`;

export const iconNumberContainter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SectionButton = styled(IconButton)`
  margin: auto 1rem;
`;
