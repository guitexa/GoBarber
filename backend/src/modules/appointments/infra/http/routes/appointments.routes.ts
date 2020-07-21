import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointments = new AppointmentsController();

appointmentsRouter.use(ensureAuth);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

appointmentsRouter.post('/', appointments.create);

export default appointmentsRouter;
