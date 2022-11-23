import { IOrder } from '../../../core/orders/IOrder';
import { FakeBroker } from '../../../__mocks__/messageBroker/broker';
import { FakeDatabase } from '../../../__mocks__/repository/database';
import { AccumulatePoints } from '../../users/accumulatePoints/accumulatePoints';
import { SpendPoints } from '../../users/spendPoints/spendPoints';
import { CreateAnOrder } from './createAnOrder';

jest.mock('../../../__mocks__/messageBroker/broker');
jest.mock('../../../__mocks__/repository/database');
jest.mock('../../users/spendPoints/spendPoints');
jest.mock('../../users/accumulatePoints/accumulatePoints');

describe('Create An Orden', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save an order in DB and call spendPoint logic if paymethod is "Points" ', async () => {
    const orderData: IOrder = {
      userId: '1',
      payMethod: 'Points',
      points: 0,
      total: 5000,
      listProducts: ['Test Product']
    };

    const fakeDatabase = new FakeDatabase() as jest.Mocked<FakeDatabase>;
    const fakeMessageBroker = new FakeBroker();
    const spendPoint = new SpendPoints(fakeDatabase, fakeMessageBroker);
    const accumulatePoints = new AccumulatePoints(fakeDatabase, fakeMessageBroker);

    const createOrder = new CreateAnOrder(fakeDatabase, accumulatePoints, spendPoint, fakeMessageBroker);

    await createOrder.createAnOrder(orderData);
    expect(spendPoint.spendPoints).toBeCalledTimes(1);
    expect(accumulatePoints.accumulatePoints).not.toBeCalled();
    expect(fakeMessageBroker.publish).toBeCalledTimes(1);
    expect(fakeDatabase.createOrder).toBeCalledTimes(1);
  });

  it('should save an order in DB and call accumulatePoints logic if paymethod is "Cash" ', async () => {
    const orderData: IOrder = {
      userId: '1',
      payMethod: 'Cash',
      points: 0,
      total: 5000,
      listProducts: ['Test Product']
    };

    const fakeDatabase = new FakeDatabase() as jest.Mocked<FakeDatabase>;
    const fakeMessageBroker = new FakeBroker();
    const spendPoint = new SpendPoints(fakeDatabase, fakeMessageBroker);
    const accumulatePoints = new AccumulatePoints(fakeDatabase, fakeMessageBroker);

    const createOrder = new CreateAnOrder(fakeDatabase, accumulatePoints, spendPoint, fakeMessageBroker);

    await createOrder.createAnOrder(orderData);
    expect(accumulatePoints.accumulatePoints).toBeCalledTimes(1);
    expect(spendPoint.spendPoints).not.toBeCalled();
    expect(fakeMessageBroker.publish).toBeCalledTimes(1);
    expect(fakeDatabase.createOrder).toBeCalledTimes(1);
  });

  it('should not save an order if paymethod if invalid or something fail', async () => {
    const orderData: IOrder = {
      userId: '1',
      payMethod: 'XXX',
      points: 0,
      total: 5000,
      listProducts: ['Test Product']
    };

    const fakeDatabase = new FakeDatabase() as jest.Mocked<FakeDatabase>;
    const fakeMessageBroker = new FakeBroker();
    const spendPoint = new SpendPoints(fakeDatabase, fakeMessageBroker);
    const accumulatePoints = new AccumulatePoints(fakeDatabase, fakeMessageBroker);

    const createOrder = new CreateAnOrder(fakeDatabase, accumulatePoints, spendPoint, fakeMessageBroker);

    await createOrder.createAnOrder(orderData);
    expect(spendPoint.spendPoints).not.toBeCalled();
    expect(accumulatePoints.accumulatePoints).not.toBeCalled();
    expect(fakeMessageBroker.publish).not.toBeCalled();
    expect(fakeDatabase.createOrder).not.toBeCalled();
  });

  it('should spendpoint return string if something fail and paymethod is "Points"', async () => {
    const orderData: IOrder = {
      userId: '1',
      payMethod: 'Points',
      points: 0,
      total: 5000,
      listProducts: ['Test Product']
    };

    try {
      const fakeDatabase = new FakeDatabase() as jest.Mocked<FakeDatabase>;
      const fakeMessageBroker = new FakeBroker();
      const spendPoint = new SpendPoints(fakeDatabase, fakeMessageBroker) as jest.Mocked<SpendPoints>;
      const accumulatePoints = new AccumulatePoints(fakeDatabase, fakeMessageBroker);

      const createOrder = new CreateAnOrder(fakeDatabase, accumulatePoints, spendPoint, fakeMessageBroker);

      spendPoint.spendPoints.mockResolvedValue('Something fail');

      await createOrder.createAnOrder(orderData);
      expect(spendPoint.spendPoints).toBeCalledTimes(1);
      expect(accumulatePoints.accumulatePoints).not.toBeCalled();
      expect(fakeMessageBroker.publish).not.toBeCalled();
      expect(fakeDatabase.createOrder).not.toBeCalled();
    } catch (error) {
      expect(error).toEqual('Something fail');
    }
  });

  it('should accumulatePoints return string if something fail and paymethod is "Cash"', async () => {
    const orderData: IOrder = {
      userId: '1',
      payMethod: 'Cash',
      points: 0,
      total: 5000,
      listProducts: ['Test Product']
    };

    try {
      const fakeDatabase = new FakeDatabase() as jest.Mocked<FakeDatabase>;
      const fakeMessageBroker = new FakeBroker();
      const spendPoint = new SpendPoints(fakeDatabase, fakeMessageBroker);
      const accumulatePoints = new AccumulatePoints(fakeDatabase, fakeMessageBroker) as jest.Mocked<AccumulatePoints>;

      const createOrder = new CreateAnOrder(fakeDatabase, accumulatePoints, spendPoint, fakeMessageBroker);

      accumulatePoints.accumulatePoints.mockResolvedValue('Something fail');

      await createOrder.createAnOrder(orderData);
      expect(accumulatePoints.accumulatePoints).toBeCalledTimes(1);
      expect(spendPoint.spendPoints).not.toBeCalled();
      expect(fakeMessageBroker.publish).not.toBeCalled();
      expect(fakeDatabase.createOrder).not.toBeCalled();
    } catch (error) {
      expect(error).toEqual('Something fail');
    }
  });
});
