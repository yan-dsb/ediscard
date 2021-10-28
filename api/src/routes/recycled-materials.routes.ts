import { Router } from 'express';
import { body } from 'express-validator';
import { CreateRecycledMaterialsController } from '../controllers/CreateRecycledMaterialsController';
import { ListUserRecycledMaterialsController } from '../controllers/ListUserRecycledMaterialsController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin';

const recycledMaterialRouter = Router();

const createRecycledMaterialController =
  new CreateRecycledMaterialsController();
const listUserRecycledMaterialsController =
  new ListUserRecycledMaterialsController();

recycledMaterialRouter.post(
  '/',
  body('user_id').not().isEmpty().trim().escape().isUUID(),
  body('weight_amount').isNumeric(),
  ensureAuthenticated,
  ensureIsAdmin,
  createRecycledMaterialController.handle
);

recycledMaterialRouter.get(
  '/me',
  ensureAuthenticated,
  listUserRecycledMaterialsController.handle
);

export { recycledMaterialRouter };
