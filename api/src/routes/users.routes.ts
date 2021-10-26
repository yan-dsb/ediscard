import { CreateUserController } from '../controllers/CreateUserController';
import { Router } from 'express';
import { body, param } from 'express-validator';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { FindUserByEmailController } from '../controllers/FindUserByEmailController';
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin';

const usersRouter = Router();

const createUserController = new CreateUserController();
const findUserByEmailController = new FindUserByEmailController();

usersRouter.post(
  '/',
  body('name').not().isEmpty().trim().escape(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  createUserController.handle
);

usersRouter.get(
  '/email/:email',
  param('email').isEmail(),
  ensureAuthenticated,
  ensureIsAdmin,
  findUserByEmailController.handle
);

export { usersRouter };
