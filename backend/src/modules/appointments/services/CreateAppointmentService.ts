import { injectable, inject } from 'tsyringe';
import { startOfHour, isBefore, getHours, format } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { ptBR } from 'date-fns/locale';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    date,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const keyCache = `provider-appointments-list:${provider_id}:${format(
      appointmentDate,
      'yyyy-M-d',
    )}`;

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You cannot schedule an appointment on the past');
    }

    const provider = await this.usersRepository.findByID(provider_id);

    if (!provider) {
      throw new AppError('This provider_id not exists');
    }

    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError('This user_id not exists');
    }

    if (provider_id === user_id) {
      throw new AppError('You cannot schedule an appointment with yourself');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You cannot schedule an appointment outside business hour',
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const formattedDate = format(appointmentDate, "dd 'de' MMMM 'às' HH'h'", {
      locale: ptBR,
    });

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Agendamento criado em nome de ${user.name} para o dia ${formattedDate}`,
    });

    await this.cacheProvider.invalidate(keyCache);

    return appointment;
  }
}
