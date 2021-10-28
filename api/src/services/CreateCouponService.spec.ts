import { AppError } from '../errors/AppError';
import { FakeBalancesRepository } from '../repositories/fakes/FakeBalancesRepository';
import { FakeCouponsRepository } from '../repositories/fakes/FakeCouponsRepository';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { CreateCouponService } from './CreateCouponService';

let usersRepository: FakeUsersRepository;
let balancesRepository: FakeBalancesRepository;
let couponsRepository: FakeCouponsRepository;
let createCoupon: CreateCouponService;
describe('Create Coupon', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    balancesRepository = new FakeBalancesRepository();
    couponsRepository = new FakeCouponsRepository();
    createCoupon = new CreateCouponService(
      usersRepository,
      balancesRepository,
      couponsRepository
    );
  });

  it('should be able to create new coupon', async () => {
    const user = await usersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });
    await balancesRepository.create({
      amount: 20,
      user_id: user.id
    });
    const coupon = await createCoupon.execute({
      amount: 20,
      user_id: user.id
    });

    expect(coupon).toHaveProperty('id');
  });

  it('should not be able to create new coupon with a non existing user', async () => {
    await expect(
      createCoupon.execute({
        amount: 20,
        user_id: 'user-id'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create new coupon, user is a admin', async () => {
    const user = await usersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password',
      isAdmin: true
    });
    await balancesRepository.create({
      amount: 20,
      user_id: user.id
    });
    await expect(
      createCoupon.execute({
        amount: 20,
        user_id: user.id
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create new coupon with amount value less than or equal to 0', async () => {
    const user = await usersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });
    await balancesRepository.create({
      amount: 20,
      user_id: user.id
    });
    await expect(
      createCoupon.execute({
        amount: 0,
        user_id: user.id
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create new coupon without a account balance', async () => {
    const user = await usersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });
    await expect(
      createCoupon.execute({
        amount: 20,
        user_id: user.id
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create new coupon, user has insuficient funds', async () => {
    const user = await usersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });
    await balancesRepository.create({
      amount: 20,
      user_id: user.id
    });
    await expect(
      createCoupon.execute({
        amount: 21,
        user_id: user.id
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
