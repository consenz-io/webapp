import styled from 'styled-components';
import { Card } from '@mui/material';

export const CardEl = styled(Card)`
  border-radius: 8px;
  width: 20%;
  position: absolute;
`;

export const Header = styled.header`
  background-color: #595f68;
  height: fit-content;
  padding: 1.5rem;
`;

export const Tag = styled.div`
  flex-grow: 0;
  position: absolute;
  top: 5%;
  left: 2%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.2rem;
  border-radius: 4px;
  background-color: #8d54ea;
  font-family: Lato;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.54;
  letter-spacing: normal;
  text-align: left;
  color: white;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.div`
  display: flex;
  height: 3.5rem;
  justify-content: center;
  align-items: center;
`;

export const Footer = styled.footer``;

export const Title = styled.div`
  font-weight: bold;
  line-height: 1.5;
  padding: 1rem 0.5rem;
`;

export const Participants = styled.div`
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  padding: 0 0.5rem;
  line-height: 1.67;
  color: #bdbdbd;
`;

export const UpdatedAt = styled.div`
  font-size: 12px;
  padding: 1rem 0.5rem;
  color: rgba(255, 255, 255, 0.77);
`;
