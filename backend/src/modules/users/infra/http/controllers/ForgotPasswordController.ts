import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ForgotPasswordService from '@modules/users/services/ForgotPasswordService';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const forgotPassword = container.resolve(ForgotPasswordService);

    await forgotPassword.execute({ email });

    return res.status(204).json();
  }
}
