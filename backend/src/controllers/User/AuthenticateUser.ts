import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../config/auth';

import AppError from '../../errors/AppError';
import IAuthentication from '../../interfaces/Authentication';

import User from '../../models/User';

interface RequestBody {
  email: string;
  password: string;
}

export default {
  async execute(
    request: Request,
    response: Response,
  ): Promise<IAuthentication> {
    try {
      const { email, password }: RequestBody = request.body;
      const usersRepository = getRepository(User);

      const user = await usersRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new AppError('Incorrect email/password combination.', 401);
      }

      const passwordMatched = await compare(password, user.password);

      if (!passwordMatched) {
        throw new AppError('Incorrect email/password combination.', 401);
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({}, secret, {
        subject: user.id,
        expiresIn,
      });

      const result = {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      };

      return response.status(200).json(result) && result;
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  },
};
