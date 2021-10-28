import { AppError } from '../errors/AppError';
import { IBalancesRepository } from '../repositories/IBalancesRepository';
import { ICouponsRepository } from '../repositories/ICouponsRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequestData {
  amount: number;
  user_id: string;
}

class CreateCouponService {
  constructor(
    private usersRepository: IUsersRepository,
    private balancesRepository: IBalancesRepository,
    private couponsRepository: ICouponsRepository
  ) {}
  async execute({ amount, user_id }: IRequestData) {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.isAdmin) {
      throw new AppError('User admin cannot create a coupon');
    }

    if (amount <= 0) {
      throw new AppError('Amount value has to be greater than 0');
    }

    const balance = await this.balancesRepository.findByUserID(user.id);

    if (!balance) {
      throw new AppError('User balance not found');
    }

    if (balance.amount < amount) {
      throw new AppError('Insuficient funds');
    }

    const coupon = await this.couponsRepository.create({
      amount,
      balance_id: balance.id
    });

    const newBalance = balance.amount - amount;

    await this.balancesRepository.update({
      id: balance.id,
      amount: newBalance
    });
    return coupon;
  }
}

export { CreateCouponService };
