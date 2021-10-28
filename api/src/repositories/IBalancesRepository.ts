import { ICreateBalanceDTO } from '../dtos/ICreateBalanceDTO';
import { IUpdateBalanceDTO } from '../dtos/IUpdateBalanceDTO';
import { Balance } from '../entities/Balance';

interface IBalancesRepository {
  create(data: ICreateBalanceDTO): Promise<Balance>;
  findByUserID(user_id: string): Promise<Balance | undefined | null>;
  update(data: IUpdateBalanceDTO): Promise<void>;
}

export { IBalancesRepository };
