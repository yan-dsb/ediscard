import { ICreateCouponDTO } from '../dtos/ICreateCouponDTO';
import { Coupon } from '../entities/Coupon';

interface ICouponsRepository {
  create(data: ICreateCouponDTO): Promise<Coupon>;
  listByBalanceID(balance_id: string): Promise<Coupon[]>;
}

export { ICouponsRepository };
