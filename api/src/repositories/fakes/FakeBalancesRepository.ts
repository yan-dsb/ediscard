import { ICreateBalanceDTO } from '../../dtos/ICreateBalanceDTO';
import { IUpdateBalanceDTO } from '../../dtos/IUpdateBalanceDTO';
import { Balance } from '../../entities/Balance';
import { IBalancesRepository } from '../IBalancesRepository';

class FakeBalancesRepository implements IBalancesRepository {
  private balances: Balance[] = [];
  async create({ user_id, amount }: ICreateBalanceDTO) {
    const balance = new Balance();
    Object.assign(balance, { user_id, amount });
    this.balances.push(balance);

    return balance;
  }

  async findByUserID(user_id: string) {
    return this.balances.find(balance => balance.user_id === user_id);
  }

  async update({ id, amount }: IUpdateBalanceDTO) {
    const index = this.balances.findIndex(balance => balance.id === id);

    this.balances[index].amount = amount;
  }
}

export { FakeBalancesRepository };
