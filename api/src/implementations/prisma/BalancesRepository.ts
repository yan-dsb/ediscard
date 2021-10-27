import { ICreateBalanceDTO } from '../../dtos/ICreateBalanceDTO';
import { IBalancesRepository } from '../../repositories/IBalancesRepository';
import { prismaClient } from '../../prisma';
import { Balance } from '../../entities/Balance';
import { IUpdateBalanceDTO } from '../../dtos/IUpdateBalanceDTO';

class BalancesRepository implements IBalancesRepository {
  async create({ user_id, amount }: ICreateBalanceDTO) {
    await prismaClient.balance.create({ data: { user_id, amount } });
  }

  async findByUserID(user_id: string) {
    const balance: Balance | null = await prismaClient.balance.findUnique({
      where: { user_id }
    });
    return balance;
  }

  async update({ id, amount }: IUpdateBalanceDTO) {
    await prismaClient.balance.update({
      data: { amount },
      where: { id }
    });
  }
}

export { BalancesRepository };
