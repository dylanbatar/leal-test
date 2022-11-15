import { Router } from 'express';
import { adapterRouterJson } from '../adapter/express-adapter';
import { makeCreateAnOrder } from '../factories/orders';

const router = Router();
router.post('/', adapterRouterJson(makeCreateAnOrder()));

export default router;
