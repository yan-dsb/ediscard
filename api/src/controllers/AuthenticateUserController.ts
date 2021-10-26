import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UsersRepository } from '../implementations/prisma/UsersRepository';
import { BCryptHashProvider } from '../providers/implementations/BCryptHashProvider';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { email, password } = request.body;

    const usersRepository = new UsersRepository();
    const bCryptHashProvider = new BCryptHashProvider();
    const authenticateUser = new AuthenticateUserService(
      usersRepository,
      bCryptHashProvider
    );

    const user = await authenticateUser.execute({ email, password });

    return response.json(user);
  }
}

export { AuthenticateUserController };
