import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UsersRepository } from '../implementations/prisma/UsersRepository';
import { FindUserByEmailService } from '../services/FindUserByEmailService';

class FindUserByEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { email } = request.params;

    const usersRepository = new UsersRepository();
    const findUserByEmail = new FindUserByEmailService(usersRepository);

    const user = await findUserByEmail.execute(email);

    return response.json(user);
  }
}

export { FindUserByEmailController };
