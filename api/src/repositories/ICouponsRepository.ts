import { ICreateCouponDTO } from '../dtos/ICreateCouponDTO';
import { Coupon } from '../entities/Coupon';

interface ICouponsRepository {
  create(data: ICreateCouponDTO): Promise<Coupon>;
}

export { ICouponsRepository };
