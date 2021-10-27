import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UsersRepository } from '../implementations/prisma/UsersRepository';
import { BalancesRepository } from '../implementations/prisma/BalancesRepository';
import { BCryptHashProvider } from '../providers/implementations/BCryptHashProvider';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const balancesRepository = new BalancesRepository();
    const bCryptHashProvider = new BCryptHashProvider();
    const createUser = new CreateUserService(
      usersRepository,
      balancesRepository,
      bCryptHashProvider
    );

    const user = await createUser.execute({ name, email, password });

    return response.json(user);
  }
}

export { CreateUserController };
