import { AppError } from '../errors/AppError';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { FindUserByEmailService } from './FindUserByEmailService';

let fakeUsersRepository: FakeUsersRepository;
let findUserByEmail: FindUserByEmailService;

describe('Find User By Email', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    findUserByEmail = new FindUserByEmailService(fakeUsersRepository);
  });
  it('should be able to find a user by email', async () => {
    await fakeUsersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });
    const user = await findUserByEmail.execute('user@example.com');
    expect(user).toHaveProperty('id');
  });

  it('should not be able to find a user by email with a non existing email', async () => {
    await expect(
      findUserByEmail.execute('user@example.com')
    ).rejects.toBeInstanceOf(AppError);
  });
});
