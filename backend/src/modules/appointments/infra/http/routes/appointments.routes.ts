import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointments = new AppointmentsController();
const providerAppointments = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuth);

appointmentsRouter.post('/', appointments.create);
appointmentsRouter.get('/me', providerAppointments.show);

export default appointmentsRouter;
