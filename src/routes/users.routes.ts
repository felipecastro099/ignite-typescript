import { Router } from 'express';

import { CreateUseController } from '../modules/accounts/useCases/createUser/CreateUseController';

const usersRoutes = Router();

const createUserController = new CreateUseController();

usersRoutes.post('/', createUserController.handle);

export { usersRoutes };
