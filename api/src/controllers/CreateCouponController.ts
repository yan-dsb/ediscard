import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BalancesRepository } from '../implementations/prisma/BalancesRepository';
import { CouponsRepository } from '../implementations/prisma/CouponsRepository';
import { UsersRepository } from '../implementations/prisma/UsersRepository';
import { CreateCouponService } from '../services/CreateCouponService';

class CreateCouponController {
  async handle(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { amount } = request.body;
    const { user_id } = request;
    const usersRepository = new UsersRepository();
    const balancesRepository = new BalancesRepository();
    const couponsRepository = new CouponsRepository();
    const createCoupon = new CreateCouponService(
      usersRepository,
      balancesRepository,
      couponsRepository
    );

    const coupon = await createCoupon.execute({ amount, user_id });

    return response.json(coupon);
  }
}

export { CreateCouponController };
