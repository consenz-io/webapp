import styled from 'styled-components';
import { Modal } from '@mui/material';

export const ModalElement = styled(Modal)`
  && {
    background-color: #3f4550;
    width: 640px;
    height: 226px;
    align-self: stretch;
    flex-grow: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 32px;
    margin: 242px 352px 399px 12px;
    padding: 24px 32px 32px;
    border-radius: 8px;
  }
`;
