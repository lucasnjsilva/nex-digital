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
      const userRepository = getRepository(User);

      const { name, email, password }: IUserRequestBody = request.body;

      const checkUserExists = await userRepository.findOne({
        where: { email },
      });

      if (checkUserExists) {
        throw new AppError('E-mail address already used.', 400);
      }

      const userSchema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email('E-mail must be a valid e-mail.').required(),
        password: Yup.string().required(),
      });

      await userSchema.validate(request.body, { abortEarly: false });

      const hashedPassword = await hash(password, 8);

      const userData = userRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      await userRepository.save(userData);

      const checkUserData = await userRepository.findOne({
        where: { email },
      });

      if (!checkUserData) throw new AppError('User not found.', 400);

      const data: ICreateUser = {
        id: checkUserData.id,
        name: checkUserData.name,
        email: checkUserData.email,
        created_at: checkUserData.created_at,
        updated_at: checkUserData.updated_at,
        deleted_at: checkUserData.deleted_at,
      };

      return response.status(201).json(data) && data;
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  },
};
