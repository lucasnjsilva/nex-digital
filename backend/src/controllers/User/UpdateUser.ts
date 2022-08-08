import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import { hash } from 'bcryptjs';
import AppError from 'src/errors/AppError';

import User from '@models/User';

import ICreateUser from 'src/interfaces/CreateUser';
import IUserRequestBody from '../../interfaces/UserRequestBody';

export default {
  async execute(
    request: Request,
    response: Response,
  ): Promise<ICreateUser | string> {
    try {
      const { id } = request.params;

      const userRepository = getRepository(User);

      const { name, email, password }: IUserRequestBody = request.body;

      const checkUserExists = await userRepository.findOne({
        where: { id },
      });

      if (!checkUserExists) {
        throw new AppError('User not found.', 404);
      }

      const userSchema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email('E-mail must be a valid e-mail.').required(),
        password: Yup.string().required(),
      });

      await userSchema.validate(request.body, { abortEarly: false });

      const hashedPassword = await hash(password, 8);

      const updateUser = await userRepository.update(id, {
        name,
        email,
        password: hashedPassword,
      });

      if (updateUser.affected !== 1) {
        throw new AppError('Unable to perform update.', 400);
      }

      const updatedUser = await userRepository.findOne({ where: { id } });

      if (!updatedUser) throw new AppError('User not found.', 404);

      const data: ICreateUser = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        created_at: updatedUser.created_at,
        updated_at: updatedUser.updated_at,
        deleted_at: updatedUser.deleted_at,
      };

      return response.status(200).json(data) && data;
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  },
};
