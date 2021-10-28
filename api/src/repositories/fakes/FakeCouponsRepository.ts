import { ICreateCouponDTO } from '../../dtos/ICreateCouponDTO';
import { Coupon } from '../../entities/Coupon';
import { ICouponsRepository } from '../ICouponsRepository';

class FakeCouponsRepository implements ICouponsRepository {
  private coupons: Coupon[] = [];
  async create({ amount, balance_id }: ICreateCouponDTO) {
    const coupon = new Coupon();
    Object.assign(coupon, { amount, balance_id });
    this.coupons.push(coupon);

    return coupon;
  }

  async listByBalanceID(balance_id: string) {
    const coupons = this.coupons.filter(
      coupon => coupon.balance_id === balance_id
    );
    return coupons;
  }
}

export { FakeCouponsRepository };
