import { Router } from 'express';
import { adapterRouterJson } from '../adapter/express-adapter';
import { makeGetUserPoints } from '../factories/user';
import { validateContract } from '../middlewares';
import getUserPointsContract from '../validations/getUserPoints';

const router = Router();

router.get('/:userId', validateContract(getUserPointsContract), adapterRouterJson(makeGetUserPoints()));

export default router;
