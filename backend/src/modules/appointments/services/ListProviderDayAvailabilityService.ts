import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

interface IResponse {
  hour: number;
  available: boolean;
}

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse[]> {
    const checkProviderExists = await this.usersRepository.findByID(
      provider_id,
    );

    if (!checkProviderExists) {
      throw new AppError('This provider_id not exists');
    }

    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        day,
        provider_id,
        month,
        year,
      },
    );

    const startHour = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + startHour,
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const appointmentsInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !appointmentsInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}
