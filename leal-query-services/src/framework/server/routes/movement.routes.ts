import { Router } from 'express';
import { adapterRouterJson } from '../adapter/express-adapter';
import { makeGetAllMovementOfUser, makeGetMovementDetail } from '../factories/movements';
import { validateContract } from '../middlewares';

import getAllMovementOfUser from '../validations/getAllMovementOfUser';
import getMovementDetailContract from '../validations/getMovementDetail';

const router = Router();
router.get('/:orderId', validateContract(getMovementDetailContract), adapterRouterJson(makeGetMovementDetail()));
router.get('/user/:userId', validateContract(getAllMovementOfUser), adapterRouterJson(makeGetAllMovementOfUser()));

export default router;
