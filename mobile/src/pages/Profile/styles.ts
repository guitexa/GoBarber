import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 40px 22px 22px;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

export const BackButton = styled(RectButton)`
  position: absolute;
  top: 0;
  left: 10px;
  width: 30px;
  height: 30px;
`;

export const AvatarContainer = styled.View``;

export const CameraContainer = styled(RectButton)`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #ff9000;
  border: none;
  width: 54px;
  height: 54px;
  border-radius: 27px;
  justify-content: center;
  align-items: center;
  z-index: 99999;
`;

export const Avatar = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

export const ContainerTitle = styled.View`
  padding: 0 20px;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 30px 0 15px 0;
`;

export const ButtonSignOut = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  border-top-width: 1px;
  border-color: #232129;
  margin-top: 30px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const ButtonSignOutText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  margin-right: 10px;
  color: #999591;
`;
