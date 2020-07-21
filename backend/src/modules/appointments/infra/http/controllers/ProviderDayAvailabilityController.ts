import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { day, month, year } = req.body;

    const providerDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await providerDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return res.json(availability);
  }
}
