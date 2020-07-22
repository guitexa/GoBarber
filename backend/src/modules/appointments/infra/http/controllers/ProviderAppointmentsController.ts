import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { day, month, year } = req.body;

    const providerAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await providerAppointments.execute({
      provider_id: req.user.id,
      day,
      month,
      year,
    });

    return res.json(appointments);
  }
}
