import { Express, Router } from 'express';
import { OrderRoutes } from '../routes';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  router.use('/orders', OrderRoutes);
};
