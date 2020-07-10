import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      provider_id: '72495234675974369',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should NOT be able to create appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

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
