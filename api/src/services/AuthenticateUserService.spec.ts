import { AppError } from '../errors/AppError';
import { FakeHashProvider } from '../providers/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { AuthenticateUserService } from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });
  it('should be able to authenticate a user', async () => {
    await fakeUsersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });
    const response = await authenticateUser.execute({
      email: 'user@example.com',
      password: 'password'
    });
    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate a user with a non existing email', async () => {
    await expect(
      authenticateUser.execute({
        email: 'user@example.com',
        password: 'password'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with a incorrect password', async () => {
    await fakeUsersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });
    await expect(
      authenticateUser.execute({
        email: 'user@example.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
