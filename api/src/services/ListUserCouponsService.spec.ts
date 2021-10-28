import { AppError } from '../errors/AppError';
import { FakeBalancesRepository } from '../repositories/fakes/FakeBalancesRepository';
import { FakeCouponsRepository } from '../repositories/fakes/FakeCouponsRepository';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { ListUserCouponsService } from './ListUserCouponsService';

let usersRepository: FakeUsersRepository;
let balancesRepository: FakeBalancesRepository;
let couponsRepository: FakeCouponsRepository;
let listUserCoupons: ListUserCouponsService;
describe('List User Coupons', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    balancesRepository = new FakeBalancesRepository();
    couponsRepository = new FakeCouponsRepository();
    listUserCoupons = new ListUserCouponsService(
      usersRepository,
      balancesRepository,
      couponsRepository
    );
  });

  it('should be able to list user coupons', async () => {
    const user = await usersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });
    const balance = await balancesRepository.create({
      amount: 20,
      user_id: user.id
    });

    await couponsRepository.create({
      amount: 20,
      balance_id: balance.id
    });
    const coupons = await listUserCoupons.execute(user.id);

    expect(coupons.length).toBeGreaterThan(0);
  });

  it('should not be able to list user coupons, user not found', async () => {
    await expect(listUserCoupons.execute('user-id')).rejects.toBeInstanceOf(
      AppError
    );
  });

  it('should not be able to list user coupons, user balance not found', async () => {
    const user = await usersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });
    await expect(listUserCoupons.execute(user.id)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
