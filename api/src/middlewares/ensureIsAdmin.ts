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
  await checkIfUserIsAdminService.execute(user_id);

  return next();
}

export { ensureIsAdmin };
