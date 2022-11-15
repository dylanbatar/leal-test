import express from 'express';
import setupMiddleware from './middleware';
import setupRouter from './routes';

const app = express();
setupMiddleware(app);
setupRouter(app);

export default app;
