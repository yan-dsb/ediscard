import { IUsersRepository } from '../repositories/IUsersRepository';

class CheckIfUserIsAdminService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user_id: string) {
    const user = await this.usersRepository.findByID(user_id);

    return user;
  }
}
export { CheckIfUserIsAdminService };
