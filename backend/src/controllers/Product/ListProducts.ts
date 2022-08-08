import { Request, Response } from 'express';
import AppError from 'src/errors/AppError';
import Products from 'src/seeders/products';

import IProducts from 'src/interfaces/IProducts';

export default {
  async execute(request: Request, response: Response): Promise<IProducts[]> {
    try {
      return response.status(200).json(Products) && Products;
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  },
};
