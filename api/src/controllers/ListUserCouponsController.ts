import { Request, Response } from 'express';
import { BalancesRepository } from '../implementations/prisma/BalancesRepository';
import { CouponsRepository } from '../implementations/prisma/CouponsRepository';
import { UsersRepository } from '../implementations/prisma/UsersRepository';
import { ListUserCouponsService } from '../services/ListUserCouponsService';

class ListUserCouponsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;
    const usersRepository = new UsersRepository();
    const balancesRepository = new BalancesRepository();
    const couponsRepository = new CouponsRepository();
    const listUserCoupons = new ListUserCouponsService(
      usersRepository,
      balancesRepository,
      couponsRepository
    );

    const coupons = await listUserCoupons.execute(user_id);

    return response.json(coupons);
  }
}

export { ListUserCouponsController };
