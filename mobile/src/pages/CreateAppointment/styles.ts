import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { Provider } from './index';
import { RectButton } from 'react-native-gesture-handler';

interface ProviderProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

interface CreAppButtonProps {
  enabled: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 20px 22px;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 20 : 20}px;
  background: #28262e;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #f5ede8;
  font-size: 20px;
  margin-left: 10px;
`;

export const ProfileButton = styled.TouchableOpacity`
  margin-left: auto;
`;

export const UserAvatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Content = styled.ScrollView``;

export const ProvidersListContainer = styled.View`
  height: 85px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  margin: 20px 0;
`;

export const ListHeaderTitle = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
`;

export const ProviderContainer = styled(RectButton)<ProviderProps>`
  background: ${(props) => (props.selected ? '#ff9000' : '#3e3b47')};
  border-radius: 10px;
  padding: 0 10px;
  margin-left: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ProviderName = styled.Text<ProviderProps>`
  color: ${(props) => (props.selected ? '#28262e' : '#f4ede8')};
  font-family: ${(props) =>
    props.selected ? 'RobotoSlab-Medium' : 'RobotoSlab-Regular'};
  font-size: 16px;
  margin-left: 10px;
`;

export const ListFooter = styled.View`
  padding: 10px;
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin: 0 15px 10px;
`;

export const ButtonDatePicker = styled(RectButton)`
  margin: 0 16px;
  background: #ff9000;
  color: #28262e;
  border-radius: 10px;
  padding: 10px 0;
  align-items: center;
  justify-content: center;
`;

export const ButtonDatePickerText = styled.Text`
  color: #28262e;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
`;

export const Schedule = styled.View`
  padding-top: 15px;
`;

export const Section = styled.View``;

export const SectionTitle = styled.Text`
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  padding: 12px 0 5px 15px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 15 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<HourProps>`
  background: ${(props) => (props.selected ? '#ff9000' : '#3e3b47')};
  border-radius: 8px;
  padding: 10px;
  margin-right: 10px;
  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${(props) => (props.selected ? '#28262e' : '#f4ede8')};
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
`;

export const CreateAppointmentButton = styled(RectButton)<CreAppButtonProps>`
  margin: 30px 15px;
  background: #ff9000;
  color: #28262e;
  border-radius: 10px;
  padding: 10px 0;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.enabled ? 1 : 0.3)};
`;

export const CreateAppointmentButtonText = styled.Text<CreAppButtonProps>`
  color: #28262e;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
`;
