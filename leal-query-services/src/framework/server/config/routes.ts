import { Express, Router } from 'express';
import { MovementRoutes, UserRoutes } from '../routes';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  router.use('/users', UserRoutes);
  router.use('/movements', MovementRoutes);
};
