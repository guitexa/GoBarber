import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { day, month, year } = req.query;

    const providerAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await providerAppointments.execute({
      provider_id: req.user.id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return res.json(classToClass(appointments));
  }
}
