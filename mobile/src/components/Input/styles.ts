import styled from 'styled-components/native';

import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 100%;
  height: 50px;
  background-color: #232129;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 6px;
  flex-direction: row;
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
