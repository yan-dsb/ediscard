import { AppError } from '../errors/AppError';
import { IBalancesRepository } from '../repositories/IBalancesRepository';
import { IRecycledMaterialsRepository } from '../repositories/IRecycledMaterialsRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequestData {
  user_id: string;
  user_id_admin: string;
  weight_amount: number;
}

class CreateRecycledMaterialService {
  constructor(
    private usersRepository: IUsersRepository,
    private balancesRepository: IBalancesRepository,
    private recycledMaterialsRepository: IRecycledMaterialsRepository
  ) {}
  async execute({ user_id, user_id_admin, weight_amount }: IRequestData) {
    const WEIGHT_BASE = 10;

    const userAdmin = await this.usersRepository.findByID(user_id_admin);

    if (!userAdmin) {
      throw new AppError('User admin not found', 404);
    }
    if (!userAdmin.isAdmin) {
      throw new AppError('User not a admin');
    }

    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.isAdmin) {
      throw new AppError('Cannot generated balance for another admin user');
    }

    const balance_generated = weight_amount / WEIGHT_BASE;

    const balance = await this.balancesRepository.findByUserID(user.id);

    if (!balance) {
      throw new AppError('User balance not found');
    }

    if (weight_amount <= 0) {
      throw new AppError('Weight amount is not bigger than 0');
    }
    const newBalance = balance.amount + balance_generated;

    await this.balancesRepository.update({
      id: balance.id,
      amount: newBalance
    });

    const recycledMaterial = await this.recycledMaterialsRepository.create({
      user_id_admin,
      user_id,
      balance_generated,
      weight_amount,
      weight_base: WEIGHT_BASE
    });

    return recycledMaterial;
  }
}

export { CreateRecycledMaterialService };
