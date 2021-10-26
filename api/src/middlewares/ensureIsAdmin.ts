import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../implementations/prisma/UsersRepository';
import { CheckIfUserIsAdminService } from '../services/CheckIfUserIsAdminService';

async function ensureIsAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request;
  const usersRepository = new UsersRepository();
  const checkIfUserIsAdminService = new CheckIfUserIsAdminService(
    usersRepository
  );
  const user = await checkIfUserIsAdminService.execute(user_id);

  if (!user) {
    throw new AppError('Unauthorized', 401);
  }

  if (!user.isAdmin) {
    throw new AppError('Unauthorized', 401);
  }

  return next();
}

export { ensureIsAdmin };
