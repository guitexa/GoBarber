import React, { useCallback, useEffect, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const route = useRoute();

  const { date } = route.params as RouteParams;

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  useEffect(
    useCallback(() => {
      const onBackPress = (): boolean => {
        reset({
          routes: [{ name: 'Dashboard' }],
          index: 0,
        });
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [reset]),
    []
  );

  const formattedDate = useMemo(() => {
    const newDate = format(
      date,
      "cccc'-feira, dia' dd 'de' MMMM 'de' yyyy 'às' HH:'00'",
      {
        locale: ptBR,
      }
    );

    const uppercaseFirstLetter = newDate.charAt(0).toUpperCase();
    const stringWithoutFirstLetter = newDate.slice(1);

    return `${uppercaseFirstLetter}${stringWithoutFirstLetter}`;
  }, [date]);

  return (
    <Container>
      <Icon name="check" size={100} color="#04d361" />

      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>

      <OkButton onPress={handleOkPressed}>
        <OkButtonText>OK</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
