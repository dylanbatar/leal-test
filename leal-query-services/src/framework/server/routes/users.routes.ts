import { Router } from 'express';
import { adapterRouterJson } from '../adapter/express-adapter';
import { makeGetUserPoints } from '../factories/user';

const router = Router();

router.get('/:userId', adapterRouterJson(makeGetUserPoints()));

export default router;
