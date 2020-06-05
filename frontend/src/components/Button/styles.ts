import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background-color: #ff9000;
  padding: 16px;
  height: 56px;
  width: 100%;
  border: 0;
  border-radius: 8px;
  margin-top: 16px;
  font-weight: 500;
  transition: all 0.2s;
  font-size: 18px;

  &:hover {
  background-color: ${shade(0.2, '#ff9000')};
  }
`;
