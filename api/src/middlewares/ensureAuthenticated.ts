import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

interface ITokenPayload {
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, `${process.env.JWT_SECRET}`) as ITokenPayload;
    request.user_id = sub;
    next();
  } catch (error) {
    throw new AppError('Invalid JWT token');
  }
}

export { ensureAuthenticated };
