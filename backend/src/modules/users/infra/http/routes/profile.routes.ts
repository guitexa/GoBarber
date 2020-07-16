import { Router } from 'express';

import ensureAuth from '../middlewares/ensureAuth';

import UserProfileController from '../controllers/UserProfileController';

const profileRouter = Router();
const userProfileController = new UserProfileController();

profileRouter.use(ensureAuth);

profileRouter.get('/', userProfileController.show);
profileRouter.put('/', userProfileController.update);

export default profileRouter;
