import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { isToday, isTomorrow, format, parseISO, isAfter } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Link } from 'react-router-dom';

import { FiPower, FiClock } from 'react-icons/fi';
import Logo from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  Profile,
  HeaderContent,
  WelcomeUser,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';
import api from '../../services/api';

interface MonthAvailability {
  day: number;
  available: boolean;
}

interface AppointmentData {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  // Estado para armazenar o dia selecionado
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Estado para armazenar o mês atual
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // Estado para armazenar os dias disponíveis recebidos da API
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailability[]
  >([]);
  // Estado para armazenar os agendamentos recebidos da API
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);

  const { signOut, user } = useAuth();

  // Função que recebe dia clicado e faz uma verificação se está disponível e se não está desabilitado, e define o estado
  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  // Função que recebe o mês clicado e define o estado
  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  // Chamada à API pra trazer os dias do mês disponíveis
  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  // Chamada à API pra trazer os agendamentos
  useEffect(() => {
    api
      .get<AppointmentData[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        const responseFormatted = response.data
          .map((appointment) => {
            return {
              ...appointment,
              hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
            };
          })
          .sort((a, b) => {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
          });

        setAppointments(responseFormatted);
      });
  }, [selectedDate]);

  // Retorna um array com os dias desabilitados
  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  // Retorna formatação de data em formato texto
  const selectedDay = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  // Retorna formatação do dia da semana
  const selectedDayOfWeek = useMemo(() => {
    const dayOfWeek = format(selectedDate, 'cccc', {
      locale: ptBR,
    });

    const uppercaseFirstLetter = dayOfWeek.charAt(0).toUpperCase();
    const stringWithoutFirstLetter = dayOfWeek.slice(1);

    return `${uppercaseFirstLetter}${stringWithoutFirstLetter}-feira`;
  }, [selectedDate]);

  // Retorna os agendamentos apenas antes do meio dia
  const morningAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  // Retorna os agendamentos apenas após o meio dia
  const afternoonAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  // Retorna o próximo agendamento
  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) =>
      isAfter(parseISO(appointment.date), new Date())
    );
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={Logo} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <WelcomeUser>
              <span>Bem vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </WelcomeUser>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower size={22} />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            {isTomorrow(selectedDate) && <span>Amanhã</span>}
            <span>{selectedDay}</span>
            <span>{selectedDayOfWeek}</span>
          </p>
          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <span>Próximo atendimento</span>
              <div>
                <img
                  src={nextAppointment.user.avatar_url}
                  alt={nextAppointment.user.name}
                />
                <strong>{nextAppointment.user.name}</strong>
                <div>
                  <FiClock size={20} />
                  <span>{nextAppointment.hourFormatted}</span>
                </div>
              </div>
            </NextAppointment>
          )}
          <Section>
            <span>Manhã</span>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <div>
                  <FiClock size={20} />
                  <span>{appointment.hourFormatted}</span>
                </div>
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <span>{appointment.user.name}</span>
                </div>
              </Appointment>
            ))}
          </Section>
          <Section>
            <span>Tarde</span>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <div>
                  <FiClock size={20} />
                  <span>{appointment.hourFormatted}</span>
                </div>
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <span>{appointment.user.name}</span>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            onMonthChange={handleMonthChange}
            data-testid="day-picker"
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
