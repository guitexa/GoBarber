import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 0 40px 40px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 40px 0 15px 0;
`;

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  width: 100%;
  height: 50px;
  background-color: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 10px 0 ${10 + getBottomSpace()}px;
  bottom: 0;
  right: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const BackToSignInText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  margin-left: 10px;
  color: #fff;
`;
