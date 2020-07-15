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
    const appointment = await createAppointment.execute({
      provider_id: '72495234675974369',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should NOT be able to create appointments on the same time', async () => {
    await createAppointment.execute({
      provider_id: '72495234675974369',
      date: new Date(),
    });

    expect(
      createAppointment.execute({
        provider_id: '72495234675974369',
        date: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
