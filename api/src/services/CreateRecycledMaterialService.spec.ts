import { AppError } from '../errors/AppError';
import { FakeBalancesRepository } from '../repositories/fakes/FakeBalancesRepository';
import { FakeRecycledMaterialsRepository } from '../repositories/fakes/FakeRecycledMaterialsRepository';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { CreateRecycledMaterialService } from './CreateRecycledMaterialService';

let fakeUsersRepository: FakeUsersRepository;
let fakeBalancesRepository: FakeBalancesRepository;
let recycledMaterialsRepository: FakeRecycledMaterialsRepository;
let createRecycledMaterial: CreateRecycledMaterialService;

describe('Create Recycled Material', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeBalancesRepository = new FakeBalancesRepository();
    recycledMaterialsRepository = new FakeRecycledMaterialsRepository();
    createRecycledMaterial = new CreateRecycledMaterialService(
      fakeUsersRepository,
      fakeBalancesRepository,
      recycledMaterialsRepository
    );
  });
  it('should be able to create a new recycled material', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });
    await fakeBalancesRepository.create({
      amount: 0,
      user_id: user.id
    });

    const userAdmin = await fakeUsersRepository.create({
      name: 'user-admin',
      email: 'user-admin@example.com',
      password: 'password',
      isAdmin: true
    });

    const recycledMaterial = await createRecycledMaterial.execute({
      user_id: user.id,
      user_id_admin: userAdmin.id,
      weight_amount: 20
    });
    expect(recycledMaterial).toHaveProperty('id');
  });

  it('should not be able to create a new recycled material, user logged in is not found', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });
    await fakeBalancesRepository.create({
      amount: 0,
      user_id: user.id
    });

    await expect(
      createRecycledMaterial.execute({
        user_id: user.id,
        user_id_admin: 'user-admin',
        weight_amount: 20
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new recycled material, user logged in is not a admin', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });
    await fakeBalancesRepository.create({
      amount: 0,
      user_id: user.id
    });

    const userAdmin = await fakeUsersRepository.create({
      name: 'user-admin',
      email: 'user-admin@example.com',
      password: 'password'
    });

    await expect(
      createRecycledMaterial.execute({
        user_id: user.id,
        user_id_admin: userAdmin.id,
        weight_amount: 20
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new recycled material, user not found', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'user-admin',
      email: 'user-admin@example.com',
      password: 'password',
      isAdmin: true
    });
    await expect(
      createRecycledMaterial.execute({
        user_id: 'user',
        user_id_admin: userAdmin.id,
        weight_amount: 20
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new recycled material, user in is a admin', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password',
      isAdmin: true
    });
    await fakeBalancesRepository.create({
      amount: 0,
      user_id: user.id
    });

    const userAdmin = await fakeUsersRepository.create({
      name: 'user-admin',
      email: 'user-admin@example.com',
      password: 'password',
      isAdmin: true
    });

    await expect(
      createRecycledMaterial.execute({
        user_id: user.id,
        user_id_admin: userAdmin.id,
        weight_amount: 20
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new recycled material, user balance not found', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });

    const userAdmin = await fakeUsersRepository.create({
      name: 'user-admin',
      email: 'user-admin@example.com',
      password: 'password',
      isAdmin: true
    });

    await expect(
      createRecycledMaterial.execute({
        user_id: user.id,
        user_id_admin: userAdmin.id,
        weight_amount: 20
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new recycled material, weight amount is not bigger than 0', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: 'password'
    });
    await fakeBalancesRepository.create({
      amount: 0,
      user_id: user.id
    });

    const userAdmin = await fakeUsersRepository.create({
      name: 'user-admin',
      email: 'user-admin@example.com',
      password: 'password',
      isAdmin: true
    });

    await expect(
      createRecycledMaterial.execute({
        user_id: user.id,
        user_id_admin: userAdmin.id,
        weight_amount: 0
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
