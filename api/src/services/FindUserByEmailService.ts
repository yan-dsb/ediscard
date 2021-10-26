import { classToClass } from 'class-transformer';
import { AppError } from '../errors/AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';

class FindUserByEmailService {
  constructor(private usersRepository: IUsersRepository) {}
  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return classToClass(user);
  }
}
export { FindUserByEmailService };
