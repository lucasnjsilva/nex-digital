import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CreateUser from '@controllers/User/CreateUser';
import ListUsers from '@controllers/User/ListUsers';
import DetailUser from '@controllers/User/DetailUser';
import UpdateUser from '@controllers/User/UpdateUser';
import DeleteUser from '@controllers/User/DeleteUser';
import RestoreUser from '@controllers/User/RestoreUser';
import DestroyUser from '@controllers/User/DestroyUser';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

// Create
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  CreateUser.execute,
);

// List all
usersRouter.get('/', ListUsers.execute);

// Detail one
usersRouter.get(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  DetailUser.execute,
);

// Update
usersRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  UpdateUser.execute,
);

// Delete
usersRouter.patch(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  DeleteUser.execute,
);

// Restore
usersRouter.patch(
  '/restore/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  RestoreUser.execute,
);

// Destroy
usersRouter.delete(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  DestroyUser.execute,
);

export default usersRouter;
