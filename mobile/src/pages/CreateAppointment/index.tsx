import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Alert, BackHandler } from 'react-native';
import {
  format,
  isWeekend,
  isBefore,
  isSaturday,
  isSunday,
  isToday,
} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface RouteParams {
  provider_id: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  ProfileButton,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  ListFooter,
  Calendar,
  Title,
  ButtonDatePicker,
  ButtonDatePickerText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { provider_id } = route.params as RouteParams;

  //Estado para armazenar os prestadores recebidos da API
  const [providers, setProviders] = useState<Provider[]>([]);
  //Estado para armazenar o prestadores selecionado
  const [selectedProvider, setSelectedProvider] = useState(provider_id);
  //Estado para armazenar se o calendário está aberto ou fechado
  const [showDatePicker, setShowDatePicker] = useState(false);
  //Estado para armazenar a data selecionada
  const [selectedDate, setSelectedDate] = useState(new Date());
  //Estado para armazenar a hora selecionada
  const [selectedHour, setSelectedHour] = useState(0);
  //Estado para armazenar a disponibilidade do prestador recebido da API
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);

  const { user } = useAuth();

  const { reset, navigate, goBack } = useNavigation();

  //Chamada à API para buscar os prestadores
  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  //Chamada à API para buscar a disponibilidade do prestador selecionado
  useEffect(() => {
    api
      .get<AvailabilityItem[]>(
        `/providers/${selectedProvider}/day-availability`,
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        }
      )
      .then((response) => setAvailability(response.data));
  }, [selectedDate, selectedProvider]);

  //Função para navegar para o perfil do usuário
  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  //Função para alterar o prestador selecionado
  const handleChangeProvider = useCallback(
    (id: string) => {
      setSelectedProvider(id);
    },
    [setSelectedProvider]
  );

  //Função para abrir e fechar o calendário
  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  //Função para selecionar uma data no calendário
  const handleDateChange = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      if (isWeekend(date)) {
        return Alert.alert(
          'Erro',
          'Este prestador atende de segunda à sexta-feira'
        );
      }
      if (isBefore(date, new Date())) {
        return Alert.alert('Erro', 'Não é possível escolher uma data passada');
      }

      setSelectedDate(date);
    }
  }, []);

  //Função para selecionar uma hora disponível
  const handleHourChange = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  //Função para criar o agendamento, enviar para API e redirecionar o usuário para tela de sucesso
  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('/appointments', {
        provider_id,
        date,
      });

      reset({
        index: 0,
        routes: [
          {
            name: 'AppointmentCreated',
            params: { date: date.getTime() },
          },
        ],
      });
    } catch (err) {
      Alert.alert(
        'Erro ao criar o agendamento',
        'Verifique as informações e tente novamente'
      );
    }
  }, [selectedDate, reset, selectedHour]);

  //Retorna a disponibilidade no período da manhã
  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ available, hour }) => {
        return {
          hour,
          available,
          formattedHour: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  //Retorna a disponibilidade no período da tarde
  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ available, hour }) => {
        return {
          hour,
          available,
          formattedHour: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  //Retorna a data selecionada formatada
  const selectedDay = useMemo(() => {
    const today = new Date();

    if (isSaturday(selectedDate) && isToday(selectedDate)) {
      setSelectedDate(new Date(today.setDate(today.getDate() + 2)));
    }

    if (isSunday(selectedDate) && isToday(selectedDate)) {
      setSelectedDate(new Date(today.setDate(today.getDate() + 1)));
    }

    const formattedDate = format(selectedDate, "dd 'de' MMMM - cccc'-feira'", {
      locale: ptBR,
    });

    return formattedDate;
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => goBack()}>
          <Icon name="chevron-left" size={25} color="#f5ede8" />
          <HeaderTitle>Cabeleireiros</HeaderTitle>
        </BackButton>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>
      <Content>
        <ProvidersListContainer>
          <ProvidersList
            data={providers}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={<ListFooter />}
            horizontal
            keyExtractor={(provider) => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                onPress={() => handleChangeProvider(provider.id)}
                selected={provider.id === selectedProvider}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>
        <Calendar>
          <Title>Dia escolhido</Title>
          <ButtonDatePicker onPress={handleToggleDatePicker}>
            <ButtonDatePickerText>{selectedDay}</ButtonDatePickerText>
          </ButtonDatePicker>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              onChange={handleDateChange}
              mode="date"
              display="calendar"
              textColor="#f4ede8"
            />
          )}
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>
          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({ formattedHour, hour, available }) => (
                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  available={available}
                  key={formattedHour}
                  onPress={() => handleHourChange(hour)}
                >
                  <HourText selected={selectedHour === hour}>
                    {formattedHour}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(
                ({ formattedHour, hour, available }) => (
                  <Hour
                    enabled={available}
                    selected={selectedHour === hour}
                    available={available}
                    key={formattedHour}
                    onPress={() => handleHourChange(hour)}
                  >
                    <HourText selected={selectedHour === hour}>
                      {formattedHour}
                    </HourText>
                  </Hour>
                )
              )}
            </SectionContent>
          </Section>
        </Schedule>
        <CreateAppointmentButton
          enabled={selectedHour > 1}
          onPress={handleCreateAppointment}
        >
          <CreateAppointmentButtonText enabled={selectedHour > 1}>
            Agendar
          </CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
