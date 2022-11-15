import { Router } from 'express';
import { adapterRouterJson } from '../adapter/express-adapter';
import { makeGetMovementDetail } from '../factories/movements';

const router = Router();
router.get('/:orderId', adapterRouterJson(makeGetMovementDetail()));

export default router;
