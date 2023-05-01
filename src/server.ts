import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import router from './routes';
import { ZodError, z } from 'zod';

const server = express();
server.use(express.json());
server.use(router);
server.use(
  (error: any, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
      return response.status(400).json({ error });
    }
    console.error(error);
    return response.status(500).json({ error });
  }
);

export default server;
