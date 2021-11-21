import { classToClass } from 'class-transformer';
import { sign } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { IHashProvider } from '../providers/IHashProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequestData {
  email: string;
  password: string;
}

class AuthenticateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider
  ) {}

  async execute({ email, password }: IRequestData) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid e-mail/password');
    }

    const passwordMatches = await this.hashProvider.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      throw new AppError('Invalid e-mail/password');
    }
    const token = sign({}, `${process.env.JWT_SECRET}`, {
      expiresIn: '1d',
      subject: user.id
    });
    return { token, user: classToClass(user) };
  }
}

export { AuthenticateUserService };
