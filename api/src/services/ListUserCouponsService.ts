import { IUsersRepository } from '../repositories/IUsersRepository';
import { ICouponsRepository } from '../repositories/ICouponsRepository';
import { AppError } from '../errors/AppError';
import { IBalancesRepository } from '../repositories/IBalancesRepository';

class ListUserCouponsService {
  constructor(
    private usersRepository: IUsersRepository,
    private balancesRepository: IBalancesRepository,
    private couponsRepository: ICouponsRepository
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

    const coupons = await this.couponsRepository.listByBalanceID(balance.id);

    return coupons;
  }
}

export { ListUserCouponsService };
