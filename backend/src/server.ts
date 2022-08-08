import 'dotenv/config.js';
import 'reflect-metadata';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
import './database';

import AppError from './errors/AppError';
import Routes from './routes';

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(cors({ origin: ['http://localhost:3334', 'http://localhost:3000'] }));
app.use(Routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

app.listen(port, () => {
  console.log(`Server Online on port ${port}! ✔`);
});
