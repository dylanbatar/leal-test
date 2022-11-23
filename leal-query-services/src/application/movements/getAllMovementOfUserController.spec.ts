import { GetMovementDetailController } from './getMovementDetailController';
import { GetMovementDetail } from '../../domain/movements/GetMovementDetail/getMovementDetail';
import { FakeDatabase } from '../../__mocks__/repository/database';
import { IMovement } from '../../core/movements/IMovement';
import { GetAllMovementOfUser } from '../../domain/movements/getAllMovementOfUser/getAllMovementOfUser';
import { GetAllMovementOfUserController } from './getAllMovementOfUserController';

jest.mock('../../domain/movements/getAllMovementOfUser/getAllMovementOfUser');

describe('GetMovement Detail Controller', () => {
  const ordersReturn: IMovement[] = [
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

  it('should return status code 200 and an order data if the order exists', async () => {
    const fakeDatabse = new FakeDatabase();
    const getAllMovementOfUser = new GetAllMovementOfUser(fakeDatabse) as jest.Mocked<GetAllMovementOfUser>;

    getAllMovementOfUser.getAll.mockResolvedValue(ordersReturn);

    const orderController = new GetAllMovementOfUserController(getAllMovementOfUser);

    const data = await orderController.handle({
      params: {
        userId: '1'
      }
    });

    expect(data.statusCode).toEqual(200);
    expect(data.body).toMatchObject(ordersReturn);
    expect(getAllMovementOfUser.getAll).toBeCalled();
  });

  it('should return status code 200 and empty array if a specific user doesnt have orders to show', async () => {
    const fakeDatabse = new FakeDatabase();
    const getAllMovementOfUser = new GetAllMovementOfUser(fakeDatabse) as jest.Mocked<GetAllMovementOfUser>;

    getAllMovementOfUser.getAll.mockResolvedValue([]);

    const orderController = new GetAllMovementOfUserController(getAllMovementOfUser);

    const data = await orderController.handle({
      params: {
        userId: '1'
      }
    });

    expect(data.statusCode).toEqual(200);
    expect(data.body).toEqual([]);
    expect(getAllMovementOfUser.getAll).toBeCalled();
  });

  it('should return status code 500 and a message if something fail', async () => {
    const fakeDatabse = new FakeDatabase();
    const getAllMovementOfUser = new GetAllMovementOfUser(fakeDatabse) as jest.Mocked<GetAllMovementOfUser>;

    getAllMovementOfUser.getAll.mockRejectedValue('Something fail');

    const orderController = new GetAllMovementOfUserController(getAllMovementOfUser);

    const data = await orderController.handle({
      params: {
        userId: '1'
      }
    });

    expect(data.statusCode).toEqual(500);
    expect(data.body).toEqual('Something fail');
  });
});
