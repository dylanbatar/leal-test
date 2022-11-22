import { FakeDatabase } from '../../../__mocks__/repository/database';
import { GetMovementDetail } from './getMovementDetail';
import { IMovement } from '../../../core/movements/IMovement';

jest.mock('../../../__mocks__/repository/database');

describe('Consult order detail', () => {
  const fakeOrder: IMovement = {
    userId: '1',
    payMethod: 'Cash',
    points: 0,
    total: 3000,
    listProducts: ['product 1']
  };

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should return the order data', async () => {
    const fakeDatabse = new FakeDatabase() as jest.Mocked<FakeDatabase>;
    const getMovementDetail = new GetMovementDetail(fakeDatabse);
    fakeDatabse.getOrderDetailById.mockResolvedValueOnce(fakeOrder);
    const orderDetail = (await getMovementDetail.getMovementDetail('1')) as IMovement;

    expect(orderDetail).toMatchObject(fakeOrder);
    expect(fakeDatabse.getOrderDetailById).toBeCalledTimes(1);
    expect(fakeDatabse.getOrderDetailById).toBeCalledWith('1');
  });

  test('Should return a string saying "Order doesn\'t exist"', async () => {
    const fakeDatabse = new FakeDatabase() as jest.Mocked<FakeDatabase>;
    const getMovementDetail = new GetMovementDetail(fakeDatabse);
    fakeDatabse.getOrderDetailById.mockResolvedValueOnce(null);
    const orderDetail = await getMovementDetail.getMovementDetail('1');

    expect(fakeDatabse.getOrderDetailById).toBeCalledTimes(1);
    expect(fakeDatabse.getOrderDetailById).toBeCalledWith('1');
    expect(orderDetail).toEqual("Order doesn't exist");
  });
});
