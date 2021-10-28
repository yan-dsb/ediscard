import { AppError } from '../errors/AppError';
import { FakeRecycledMaterialsRepository } from '../repositories/fakes/FakeRecycledMaterialsRepository';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { ListUserRecycledMaterialsService } from './ListUserRecycledMaterialsService';

let usersRepository: FakeUsersRepository;
let recycledMaterialsRepository: FakeRecycledMaterialsRepository;
let listUserRecycledMaterials: ListUserRecycledMaterialsService;
describe('List User Recycled Materials', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    recycledMaterialsRepository = new FakeRecycledMaterialsRepository();
    listUserRecycledMaterials = new ListUserRecycledMaterialsService(
      usersRepository,
      recycledMaterialsRepository
    );
  });

  it('should be to list user recycled materials', async () => {
    const user = await usersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });

    await recycledMaterialsRepository.create({
      user_id: user.id,
      user_id_admin: 'user',
      weight_base: 10,
      weight_amount: 20,
      balance_generated: 2
    });

    const recycledMaterials = await listUserRecycledMaterials.execute(user.id);

    expect(recycledMaterials.length).toBeGreaterThan(0);
  });
  it('should not be to list user recycled materials, user not found', async () => {
    await expect(
      listUserRecycledMaterials.execute('user-id')
    ).rejects.toBeInstanceOf(AppError);
  });
});
