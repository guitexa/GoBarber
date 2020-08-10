import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';

import { Provider } from './index';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 20px 22px;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 20 : 20}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  line-height: 23px;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 10px 20px 16px 20px;
`;

export const ListHeaderTitle = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  margin-top: 10px;
`;

export const ListFooter = styled.View`
  padding: 20px;
`;

export const ProviderContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-top: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  width: 76px;
  height: 76px;
  border-radius: 38px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  padding-left: 15px;
`;

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #f4ede8;
  margin-bottom: 3px;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3px;
`;

export const ProviderMetaText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #999591;
  margin-left: 8px;
`;
