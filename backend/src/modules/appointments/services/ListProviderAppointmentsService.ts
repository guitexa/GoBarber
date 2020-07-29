import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointments from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointments[]> {
    const keyCache = `provider-appointments-list:${provider_id}:${year}-${month}-${day}`;

    const checkProviderExists = await this.usersRepository.findByID(
      provider_id,
    );

    if (!checkProviderExists) {
      throw new AppError('This provider_id not exists');
    }

    let appointments = await this.cacheProvider.recover<Appointments[]>(
      keyCache,
    );

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          provider_id,
          day,
          month,
          year,
        },
      );

      await this.cacheProvider.save(keyCache, classToClass(appointments));
    }

    return appointments;
  }
}
