import styled, { css } from 'styled-components/native';

import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;
  background-color: #232129;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 6px;
  flex-direction: row;
  border-width: 1px;
  border-color: #232129;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c50300;
    `};

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `};
`;

export const InputText = styled.TextInput`
  flex: 1;
  font-family: 'RobotoSlab-Regular';
  color: #fff;
  font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
  margin: 0 12px 0 16px;
`;
