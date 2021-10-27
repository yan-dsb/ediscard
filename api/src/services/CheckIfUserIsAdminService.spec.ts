import { AppError } from '../errors/AppError';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { CheckIfUserIsAdminService } from './CheckIfUserIsAdminService';

let fakeUsersRepository: FakeUsersRepository;
let checkIfUserIsAdminService: CheckIfUserIsAdminService;
describe('Check If User Is Administrator', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    checkIfUserIsAdminService = new CheckIfUserIsAdminService(
      fakeUsersRepository
    );
  });
  it('should return a admin user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password',
      isAdmin: true
    });

    const userAdmin = await checkIfUserIsAdminService.execute(user.id);

    expect(userAdmin).toHaveProperty('id');
  });

  it('should not return a non existing user', async () => {
    await expect(
      checkIfUserIsAdminService.execute('user-id')
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not return a user thats not admin', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });
    await expect(
      checkIfUserIsAdminService.execute(user.id)
    ).rejects.toBeInstanceOf(AppError);
  });
});
