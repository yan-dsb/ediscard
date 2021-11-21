import { Router } from 'express';
import { FindUserBalanceController } from '../controllers/FindUserBalanceController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
const balancesRouter = Router();

const findUserBalanceController = new FindUserBalanceController();

balancesRouter.get(
  '/me',
  ensureAuthenticated,
  findUserBalanceController.handle
);

export { balancesRouter };
