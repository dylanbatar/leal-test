import { FakeDatabase } from '../../../__mocks__/repository/database';
import { GetAllMovementOfUser } from './getAllMovementOfUser';
import { IMovement } from '../../../core/movements/IMovement';

jest.mock('../../../__mocks__/repository/database');

describe('Get All Orders Of An User', () => {
  const fakeOrders: IMovement[] = [
    {
      payMethod: 'Cash',
      userId: '1',
      points: 0,
      total: 19000,
      listProducts: ['Smoothie Acai 52oz']
    },
    {
      payMethod: 'Cash',
      userId: '1',
      points: 0,
      total: 27000,
      listProducts: ['Bowl Acai 16 Oz']
    }
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should return all orders of a user', async () => {
    const fakeDatabse = new FakeDatabase() as jest.Mocked<FakeDatabase>;
    const getAllMovementOfUser = new GetAllMovementOfUser(fakeDatabse);

    fakeDatabse.getAllOrderByUserId.mockResolvedValueOnce(fakeOrders);
    const orders = await getAllMovementOfUser.getAll('1');

    expect(orders).toMatchObject(fakeOrders);
    expect(fakeDatabse.getAllOrderByUserId).toBeCalledTimes(1);
    expect(fakeDatabse.getAllOrderByUserId).toBeCalledWith('1');
  });

  test('Should return empty array if doesnt exist order for a specific user', async () => {
    const fakeDatabse = new FakeDatabase() as jest.Mocked<FakeDatabase>;
    const getAllMovementOfUser = new GetAllMovementOfUser(fakeDatabse);

    fakeDatabse.getAllOrderByUserId.mockResolvedValueOnce([]);
    const orders = await getAllMovementOfUser.getAll('1');

    expect(fakeDatabse.getAllOrderByUserId).toBeCalledTimes(1);
    expect(fakeDatabse.getAllOrderByUserId).toBeCalledWith('1');
    expect(orders).toEqual([]);
  });
});
