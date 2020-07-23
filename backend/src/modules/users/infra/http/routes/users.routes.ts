import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';
import ensureAuth from '../middlewares/ensureAuth';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const users = new UsersController();
const userAvatar = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required,
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  users.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  userAvatar.update,
);

export default usersRouter;
