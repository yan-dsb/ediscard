import { classToClass } from 'class-transformer';
import { AppError } from '../errors/AppError';
import { IHashProvider } from '../providers/IHashProvider';
import { IBalancesRepository } from '../repositories/IBalancesRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequestData {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private balancesRepository: IBalancesRepository,
    private hashProvider: IHashProvider
  ) {}
  async execute({ name, email, password }: IRequestData) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHashed = await this.hashProvider.generate(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHashed
    });
    const defaultBalance = 0;
    await this.balancesRepository.create({
      user_id: user.id,
      amount: defaultBalance
    });
    return classToClass(user);
  }
}

export { CreateUserService };
