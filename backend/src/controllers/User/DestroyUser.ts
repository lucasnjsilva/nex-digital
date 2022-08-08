import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from 'src/errors/AppError';

import User from '@models/User';

export default {
  async execute(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.params;
      const userRepository = getRepository(User);

      // User
      const checkUser = await userRepository.findOne({ where: { id } });

      if (!checkUser) throw new AppError('User not found.', 400);

      await userRepository.delete(id);

      return response.status(200).json();
    } catch (error) {
      throw new AppError((error as Error).message, 400);
    }
  },
};
