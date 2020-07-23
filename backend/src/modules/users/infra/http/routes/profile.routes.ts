import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '../middlewares/ensureAuth';

import UserProfileController from '../controllers/UserProfileController';

const profileRouter = Router();
const userProfile = new UserProfileController();

profileRouter.use(ensureAuth);

profileRouter.get('/', userProfile.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.string(), // Required if password is filled
      password: Joi.string().min(6), // Required if old_password is filled
      password_confirmation: Joi.string().valid(Joi.ref('password')), // Required if password is filled
    },
  }),
  userProfile.update,
);

export default profileRouter;
