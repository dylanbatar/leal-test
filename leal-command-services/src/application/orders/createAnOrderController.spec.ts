import { IOrder } from '../../core/orders/IOrder';
import { CreateAnOrder } from '../../domain/orders/createAnOrder/createAnOrder';
import { AccumulatePoints } from '../../domain/users/accumulatePoints/accumulatePoints';
import { SpendPoints } from '../../domain/users/spendPoints/spendPoints';
import { FakeBroker } from '../../__mocks__/messageBroker/broker';
import { FakeDatabase } from '../../__mocks__/repository/database';
import { HttpRequest } from '../ports/http';
import { CreateAnOrderController } from './createAnOrderController';

jest.mock('../../domain/orders/createAnOrder/createAnOrder');

describe('Create An Order Controller', () => {
  const orderDetailReturn: IOrder = {
    payMethod: 'Cash',
    userId: '1',
    points: 0,
    total: 500000,
    listProducts: ['test 1']
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return status code 200 and an order data if the order was saved successfully', async () => {
    const fakeDatabase = new FakeDatabase();
    const fakeMessageBroker = new FakeBroker();
    const accumulatePoints = new AccumulatePoints(fakeDatabase, fakeMessageBroker);
    const spendPoint = new SpendPoints(fakeDatabase, fakeMessageBroker);
    const createAnOrder = new CreateAnOrder(
      fakeDatabase,
      accumulatePoints,
      spendPoint,
      fakeMessageBroker
    ) as jest.Mocked<CreateAnOrder>;

    const createAnOrderController = new CreateAnOrderController(createAnOrder);

    createAnOrder.createAnOrder.mockResolvedValueOnce(orderDetailReturn);

    const requestBody: HttpRequest = {
      body: {
        userId: '1',
        payMethod: 'Points',
        listProduct: ['test 1'],
        total: 5000,
        points: 0
      }
    };

    const { statusCode, body } = await createAnOrderController.handle(requestBody);
    expect(statusCode).toEqual(200);
    expect(body).toMatchObject(orderDetailReturn);
  });

  it('should return status code 500 and a message if something fail', async () => {
    try {
      const fakeDatabase = new FakeDatabase();
      const fakeMessageBroker = new FakeBroker();
      const accumulatePoints = new AccumulatePoints(fakeDatabase, fakeMessageBroker);
      const spendPoint = new SpendPoints(fakeDatabase, fakeMessageBroker);
      const createAnOrder = new CreateAnOrder(
        fakeDatabase,
        accumulatePoints,
        spendPoint,
        fakeMessageBroker
      ) as jest.Mocked<CreateAnOrder>;

      const createAnOrderController = new CreateAnOrderController(createAnOrder);

      createAnOrder.createAnOrder.mockRejectedValue('Something fail');

      const requestBody: HttpRequest = {
        body: {
          userId: '1',
          payMethod: 'Points',
          listProduct: ['test 1'],
          total: 5000,
          points: 0
        }
      };

      await createAnOrderController.handle(requestBody);
    } catch (error) {
      expect(error).toEqual('Something fail');
    }
  });
});
