import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import AuthenticateUser from '@controllers/User/AuthenticateUser';

const sessionsRouter = Router();

// Login
sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  AuthenticateUser.execute,
);

export default sessionsRouter;
