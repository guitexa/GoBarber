import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 50px;
  background-color: #ff9000;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 12px;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #000;
  font-size: 18px;
`;
