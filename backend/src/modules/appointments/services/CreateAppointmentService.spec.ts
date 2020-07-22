import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeUsersRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 20, 13).getTime();
    });

    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gobarber.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    const appointment = await createAppointment.execute({
      provider_id: provider.id,
      user_id: user.id,
      date: new Date(2020, 6, 20, 14),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(provider.id);
  });

  it('should NOT be to create an appointment for an inexistent provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 20, 13).getTime();
    });

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    await expect(
      createAppointment.execute({
        provider_id: 'provider-id',
        user_id: user.id,
        date: new Date(2020, 6, 20, 14),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be to create an appointment for an inexistent user', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 20, 13).getTime();
    });

    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gobarber.com',
      password: '123456',
    });

    await expect(
      createAppointment.execute({
        provider_id: provider.id,
        user_id: 'user-id',
        date: new Date(2020, 6, 20, 14),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 20, 13).getTime();
    });

    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gobarber.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    await createAppointment.execute({
      provider_id: provider.id,
      user_id: user.id,
      date: new Date(2020, 6, 20, 14),
    });

    await expect(
      createAppointment.execute({
        provider_id: provider.id,
        user_id: user.id,
        date: new Date(2020, 6, 20, 14),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create an appointments on past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 20, 13).getTime();
    });

    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gobarber.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    await expect(
      createAppointment.execute({
        provider_id: provider.id,
        user_id: user.id,
        date: new Date(2020, 6, 20, 10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create an appointments with same user', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 20, 13).getTime();
    });

    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gobarber.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    await expect(
      createAppointment.execute({
        provider_id: user.id,
        user_id: user.id,
        date: new Date(2020, 6, 20, 14),
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        provider_id: provider.id,
        user_id: provider.id,
        date: new Date(2020, 6, 20, 14),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create an appointments before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 20, 13).getTime();
    });

    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gobarber.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    await expect(
      createAppointment.execute({
        provider_id: provider.id,
        user_id: user.id,
        date: new Date(2020, 6, 21, 7),
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        provider_id: provider.id,
        user_id: user.id,
        date: new Date(2020, 6, 21, 18),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
