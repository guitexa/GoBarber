import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 20, 13).getTime();
    });

    const appointment = await createAppointment.execute({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 6, 20, 14),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should NOT be able to create appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 20, 13).getTime();
    });

    await createAppointment.execute({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 6, 20, 14),
    });

    await expect(
      createAppointment.execute({
        provider_id: 'provider-id',
        user_id: 'user-id',
        date: new Date(2020, 6, 20, 14),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create an appointments on past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 20, 13).getTime();
    });

    await expect(
      createAppointment.execute({
        provider_id: 'provider-id',
        user_id: 'user-id',
        date: new Date(2020, 6, 20, 10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create an appointments with same user', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 20, 13).getTime();
    });

    await expect(
      createAppointment.execute({
        provider_id: 'user-id',
        user_id: 'user-id',
        date: new Date(2020, 6, 20, 14),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create an appointments before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 20, 13).getTime();
    });

    await expect(
      createAppointment.execute({
        provider_id: 'provider-id',
        user_id: 'user-id',
        date: new Date(2020, 6, 21, 7),
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        provider_id: 'provider-id',
        user_id: 'user-id',
        date: new Date(2020, 6, 21, 18),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
