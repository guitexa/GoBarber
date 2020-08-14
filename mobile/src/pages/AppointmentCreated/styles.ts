import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  text-align: center;
  color: #f4ede8;
  font-size: 30px;
  font-family: 'RobotoSlab-Medium';
`;

export const Description = styled.Text`
  text-align: center;
  font-family: 'RobotoSlab-Regular';
  font-size: 19px;
  color: #999591;
  margin-top: 20px;
`;

export const OkButton = styled(RectButton)`
  margin: 0 16px;
  background: #ff9000;
  color: #28262e;
  border-radius: 10px;
  padding: 10px 50px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const OkButtonText = styled.Text`
  color: #28262e;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
`;
