import 'express-async-errors';
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import { createServer } from 'http';
import { Server } from 'socket.io';
import { router } from './routes';
import { AppError } from './errors/AppError';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ type: 'error', message: err.message });
    }
    console.error(err);
    return response
      .status(500)
      .json({ type: 'error', message: 'Internal server error' });
  }
);

const server = createServer(app);

const io = new Server(server);

export { server, io };
