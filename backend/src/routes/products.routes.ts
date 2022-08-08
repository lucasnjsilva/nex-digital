import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ListProducts from '@controllers/Product/ListProducts';
import DetailProduct from '@controllers/Product/DetailProduct';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

// List all
usersRouter.get('/', ensureAuthenticated, ListProducts.execute);

// Detail one
usersRouter.get(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),

  DetailProduct.execute,
);

export default usersRouter;
