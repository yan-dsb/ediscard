import { IUsersRepository } from '../repositories/IUsersRepository';
import { AppError } from '../errors/AppError';
import { IRecycledMaterialsRepository } from '../repositories/IRecycledMaterialsRepository';

class ListUserRecycledMaterialsService {
  constructor(
    private usersRepository: IUsersRepository,
    private recycledMaterialsRepository: IRecycledMaterialsRepository
  ) {}
  async execute(user_id: string) {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }
    const recycledMaterials =
      await this.recycledMaterialsRepository.listByUserID(user.id);

    return recycledMaterials;
  }
}

export { ListUserRecycledMaterialsService };
