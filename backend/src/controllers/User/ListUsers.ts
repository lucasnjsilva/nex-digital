import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from 'src/errors/AppError';

import User from '@models/User';

export default {
  async execute(request: Request, response: Response): Promise<User[]> {
    try {
      const userRepository = getRepository(User);
      const users = await userRepository.find();

      return response.status(200).json(users) && users;
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  },
};
