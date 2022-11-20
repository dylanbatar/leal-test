import { Router } from 'express';
import { adapterRouterJson } from '../adapter/express-adapter';
import { makeGetMovementDetail } from '../factories/movements';
import { validateContract } from '../middlewares';
import getMovementDetailContract from '../validations/getMovementDetail';

const router = Router();
router.get('/:orderId', validateContract(getMovementDetailContract), adapterRouterJson(makeGetMovementDetail()));

export default router;
