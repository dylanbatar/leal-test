import { CreateAnOrderController } from '../../../application/orders/createAnOrderController';
import { CreateAnOrder } from '../../../domain/orders/createAnOrder/createAnOrder';
import { AccumulatePoints } from '../../../domain/users/accumulatePoints/accumulatePoints';
import { SpendPoints } from '../../../domain/users/spendPoints/spendPoints';
import { DynamoDB } from '../../database/dynamoDB/dynamoDb';
// import { InMemory as InMemoryDB } from '../../database/inMemory/inMemory';
import kafkaBroker from './events';

export const makeCreateAnOrder = (): CreateAnOrderController => {
  // const inMemoryDb = new InMemoryDB();
  const dynamoDB = new DynamoDB();
  const addPoints = new AccumulatePoints(dynamoDB, kafkaBroker);
  const decreasePoints = new SpendPoints(dynamoDB, kafkaBroker);
  const createAnOrderUseCase = new CreateAnOrder(dynamoDB, addPoints, decreasePoints, kafkaBroker);
  const createAnOrderController = new CreateAnOrderController(createAnOrderUseCase);
  return createAnOrderController;
};
