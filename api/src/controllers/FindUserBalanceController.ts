import { Request, Response } from 'express';
import { BalancesRepository } from '../implementations/prisma/BalancesRepository';
import { UsersRepository } from '../implementations/prisma/UsersRepository';
import { FindUserBalanceService } from '../services/FindUserBalanceService';

class FindUserBalanceController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const usersRepository = new UsersRepository();
    const balancesRepository = new BalancesRepository();

    const findUserBalance = new FindUserBalanceService(
      usersRepository,
      balancesRepository
    );

    const balance = await findUserBalance.execute(user_id);

    return response.json(balance);
  }
}

export { FindUserBalanceController };
