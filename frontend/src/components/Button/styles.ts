import styled from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  loading: number;
}

export const Container = styled.button<ContainerProps>`
  background-color: ${(props) => (props.loading ? '#ff900060' : '#ff9000')};
  padding: 16px;
  height: 56px;
  width: 100%;
  border: 0;
  border-radius: 8px;
  margin-top: 16px;
  font-weight: 500;
  transition: all 0.2s;
  font-size: 18px;
  color: ${(props) => (props.loading ? '#312E38' : '#000')};
  cursor: ${(props) => (props.loading ? 'wait' : 'pointer')};

  &:hover {
    background-color: ${(props) =>
      props.loading ? '#ff900060' : shade(0.2, '#ff9000')};
  }
`;
