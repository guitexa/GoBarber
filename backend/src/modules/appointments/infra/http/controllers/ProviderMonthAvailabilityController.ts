import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { month, year } = req.query;

    const providerMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availability = await providerMonthAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return res.json(availability);
  }
}
