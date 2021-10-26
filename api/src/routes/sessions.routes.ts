import { Router } from 'express';
import { body } from 'express-validator';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';

const sessionsRouter = Router();

const authenticateUserController = new AuthenticateUserController();

sessionsRouter.post(
  '/',
  body('email').not().isEmpty().trim().escape(),
  body('password').not().isEmpty().trim().escape(),
  authenticateUserController.handle
);

export { sessionsRouter };
