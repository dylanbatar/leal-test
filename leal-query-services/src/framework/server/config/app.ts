import express from 'express';
import setupMiddleware from './middleware';
import setupRouter from './routes';
import { errorOptions as setupValidationErrors } from '../middlewares';

const app = express();
setupMiddleware(app);
setupRouter(app);
app.use(setupValidationErrors);

export default app;
