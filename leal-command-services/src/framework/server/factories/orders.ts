import { CreateAnOrderController } from '../../../application/orders/createAnOrderController';
import { CreateAnOrder } from '../../../domain/orders/createAnOrder/createAnOrder';
import { AccumulatePoints } from '../../../domain/users/accumulatePoints/accumulatePoints';
import { SpendPoints } from '../../../domain/users/spendPoints/spendPoints';
import { InMemory as InMemoryDB } from '../../database/inMemory/inMemory';
import kafkaBroker from './events';

export const makeCreateAnOrder = (): CreateAnOrderController => {
  const inMemoryDb = new InMemoryDB();
  const addPoints = new AccumulatePoints(inMemoryDb, kafkaBroker);
  const decreasePoints = new SpendPoints(inMemoryDb, kafkaBroker);
  const createAnOrderUseCase = new CreateAnOrder(inMemoryDb, addPoints, decreasePoints, kafkaBroker);
  const createAnOrderController = new CreateAnOrderController(createAnOrderUseCase);
  return createAnOrderController;
};
