import { Router } from 'express';
import { adapterRouterJson } from '../adapter/express-adapter';
import { makeCreateAnOrder } from '../factories/orders';
import { validateContract } from '../middlewares';
import createOrderContract from '../validations/createOrder';

const router = Router();
router.post('/', validateContract(createOrderContract), adapterRouterJson(makeCreateAnOrder()));

export default router;
