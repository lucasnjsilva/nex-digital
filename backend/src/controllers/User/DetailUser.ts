import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from 'src/errors/AppError';

import User from '@models/User';

import ICreateUser from 'src/interfaces/CreateUser';

export default {
  async execute(request: Request, response: Response): Promise<ICreateUser> {
    try {
      const { id } = request.params;
      const userRepository = await getRepository(User);

      const checkUser = await userRepository.findOne({ where: { id } });
      if (!checkUser) throw new AppError('User not found.', 400);

      const data: ICreateUser = {
        id: checkUser.id,
        name: checkUser.name,
        email: checkUser.email,
        created_at: checkUser.created_at,
        updated_at: checkUser.updated_at,
        deleted_at: checkUser.deleted_at,
      };

      return response.status(200).json(data) && data;
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  },
};
