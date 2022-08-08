import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from 'src/errors/AppError';

import User from '@models/User';

export default {
  async execute(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.params;
      const userRepository = getRepository(User);

      const user = await userRepository.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!user) throw new AppError('User not found.', 404);

      if (user.deleted_at !== null) {
        await userRepository.restore(id);
      } else {
        throw new AppError('This user was not deleted to be restored.', 400);
      }

      return response.status(200).json();
    } catch (error) {
      throw new AppError((error as Error).message, 400);
    }
  },
};
