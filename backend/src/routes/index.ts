import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import productsRouter from './products.routes';

const Routes = Router();

Routes.use('/sessions', sessionsRouter);
Routes.use('/users', usersRouter);
Routes.use('/products', productsRouter);

export default Routes;
