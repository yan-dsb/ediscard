import { AppError } from '../errors/AppError';
import { FakeHashProvider } from '../providers/fakes/FakeHashProvider';
import { FakeBalancesRepository } from '../repositories/fakes/FakeBalancesRepository';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { CreateUserService } from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeBalancesRepository: FakeBalancesRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('Create User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeBalancesRepository = new FakeBalancesRepository();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeBalancesRepository,
      fakeHashProvider
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with a already existing email', async () => {
    await fakeUsersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });
    await expect(
      createUser.execute({
        name: 'user',
        email: 'user@example.com',
        password: 'password'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
