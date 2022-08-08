import { Request, Response } from 'express';

import AppError from 'src/errors/AppError';
import Products from 'src/seeders/products';
import IProducts from 'src/interfaces/IProducts';

export default {
  async execute(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const checkProduct = Products.map(item => {
        if (item.id === Number(id)) {
          const data: IProducts = {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
          };

          return data;
        }

        return false;
      });

      const detailProduct = checkProduct.filter(
        (product: any) => product !== null && product,
      )[0];

      if (!detailProduct) throw new AppError('Product not found.', 404);

      return response.status(200).json(detailProduct) && detailProduct;
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  },
};
