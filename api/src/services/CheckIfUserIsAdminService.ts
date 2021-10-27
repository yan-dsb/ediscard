import { AppError } from '../errors/AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';

class CheckIfUserIsAdminService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user_id: string) {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError('Unauthorized', 401);
    }

    if (!user.isAdmin) {
      throw new AppError('Unauthorized', 401);
    }

    return user;
  }
}
export { CheckIfUserIsAdminService };
