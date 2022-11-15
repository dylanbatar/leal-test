import { Express } from 'express';
import { corsOptions, bodyParse } from '../middlewares';

export default (app: Express): void => {
  app.use(corsOptions);
  app.use(bodyParse);
};
