import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import Joi from '@hapi/joi';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

const appointments = new AppointmentsController();
const providerAppointments = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuth);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointments.create,
);
appointmentsRouter.get(
  '/me',
  celebrate({
    [Segments.QUERY]: {
      day: Joi.string().required(),
      month: Joi.string().required(),
      year: Joi.string().required(),
    },
  }),
  providerAppointments.show,
);

export default appointmentsRouter;
