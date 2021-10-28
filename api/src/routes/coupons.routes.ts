import { Router } from 'express';
import { body } from 'express-validator';
import { CreateCouponController } from '../controllers/CreateCouponController';
import { ListUserCouponsController } from '../controllers/ListUserCouponsController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const couponsRouter = Router();

const createCouponController = new CreateCouponController();
const listUserCouponsController = new ListUserCouponsController();

couponsRouter.post(
  '/',
  body('amount').isNumeric(),
  ensureAuthenticated,
  createCouponController.handle
);

couponsRouter.get('/', ensureAuthenticated, listUserCouponsController.handle);

export { couponsRouter };
