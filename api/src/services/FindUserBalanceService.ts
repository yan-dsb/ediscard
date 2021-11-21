import { AppError } from '../errors/AppError';
import { IBalancesRepository } from '../repositories/IBalancesRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';

class FindUserBalanceService {
  constructor(
    private usersRepository: IUsersRepository,
    private balancesRepository: IBalancesRepository
  ) {}

  async execute(user_id: string) {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const balance = await this.balancesRepository.findByUserID(user.id);

    if (!balance) {
      throw new AppError('User balance not found');
    }

    return balance;
  }
}

export { FindUserBalanceService };
