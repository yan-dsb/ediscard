import { ICreateCouponDTO } from '../../dtos/ICreateCouponDTO';
import { prismaClient } from '../../prisma';
import { ICouponsRepository } from '../../repositories/ICouponsRepository';

class CouponsRepository implements ICouponsRepository {
  async create({
    amount,
    balance_id,
    isCancelled = false,
    isUsed = false
  }: ICreateCouponDTO) {
    const coupon = await prismaClient.coupon.create({
      data: { amount, balance_id, isCancelled, isUsed }
    });
    return coupon;
  }

  async listByBalanceID(balance_id: string) {
    const coupons = await prismaClient.coupon.findMany({
      where: { balance_id }
    });

    return coupons;
  }
}

export { CouponsRepository };
