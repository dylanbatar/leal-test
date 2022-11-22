import { GetMovementDetailController } from './getMovementDetailController';
import { GetMovementDetail } from '../../domain/movements/GetMovementDetail/getMovementDetail';
import { FakeDatabase } from '../../__mocks__/repository/database';
import { IMovement } from '../../core/movements/IMovement';

jest.mock('../../domain/movements/GetMovementDetail/getMovementDetail');

describe('GetMovement Detail Controller', () => {
  const orderDetailReturn: IMovement = {
    payMethod: 'Cash',
    userId: '1',
    points: 0,
    total: 500000,
    listProducts: ['test 1']
  };

  it('should return status code 200 and an order data if the order exists', async () => {
    const fakeDatabse = new FakeDatabase();
    const getMovementDetailMock = new GetMovementDetail(fakeDatabse) as jest.Mocked<GetMovementDetail>;

    getMovementDetailMock.getMovementDetail.mockResolvedValue(orderDetailReturn);

    const orderController = new GetMovementDetailController(getMovementDetailMock);

    const data = await orderController.handle({
      params: {
        orderId: '1'
      }
    });

    expect(data.statusCode).toEqual(200);
    expect(data.body).toMatchObject(orderDetailReturn);
  });

  it("should return status code 200 and a message if the order doesn't exists", async () => {
    const fakeDatabse = new FakeDatabase();
    const getMovementDetailMock = new GetMovementDetail(fakeDatabse) as jest.Mocked<GetMovementDetail>;

    getMovementDetailMock.getMovementDetail.mockResolvedValue("Order doesn't exist");

    const orderController = new GetMovementDetailController(getMovementDetailMock);

    const data = await orderController.handle({
      params: {
        orderId: '1'
      }
    });

    expect(data.statusCode).toEqual(200);
    expect(data.body).toEqual("Order doesn't exist");
  });

  it('should return status code 500 and a message if something fail', async () => {
    const fakeDatabse = new FakeDatabase();
    const getMovementDetailMock = new GetMovementDetail(fakeDatabse) as jest.Mocked<GetMovementDetail>;

    getMovementDetailMock.getMovementDetail.mockRejectedValue('Something fail');

    const orderController = new GetMovementDetailController(getMovementDetailMock);

    const data = await orderController.handle({
      params: {
        orderId: '1'
      }
    });

    expect(data.statusCode).toEqual(500);
    expect(data.body).toEqual('Something fail');
  });
});
