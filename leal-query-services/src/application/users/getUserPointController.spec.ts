import { GetUserPointController } from './getUserPointController';
import { GetUserPoints } from '../../domain/users/getUserPoints/getUserPoints';
import { FakeDatabase } from '../../__mocks__/repository/database';
import { IUser } from '../../core/users/IUser';

jest.mock('../../domain/users/getUserPoints/getUserPoints');

describe('GetMovement Detail Controller', () => {
  const userPointsReturn: IUser = {
    firstname: 'fake name',
    lastName: 'fake lastname',
    email: 'fake@email.com',
    points: 0
  };

  it('should return status code 200 and an user data if the user exists', async () => {
    const fakeDatabse = new FakeDatabase();
    const getUserPointsMock = new GetUserPoints(fakeDatabse) as jest.Mocked<GetUserPoints>;

    getUserPointsMock.getUserPoints.mockResolvedValue(userPointsReturn);

    const orderController = new GetUserPointController(getUserPointsMock);

    const data = await orderController.handle({
      params: {
        userId: '1'
      }
    });

    expect(data.statusCode).toEqual(200);
    expect(data.body).toMatchObject(userPointsReturn);
  });

  it("should return status code 200 and a message if the user doesn't exists", async () => {
    const fakeDatabse = new FakeDatabase();
    const getUserPointsMock = new GetUserPoints(fakeDatabse) as jest.Mocked<GetUserPoints>;

    getUserPointsMock.getUserPoints.mockResolvedValue("User doesn't exist");

    const orderController = new GetUserPointController(getUserPointsMock);

    const data = await orderController.handle({
      params: {
        userId: '1'
      }
    });

    expect(data.statusCode).toEqual(200);
    expect(data.body).toEqual("User doesn't exist");
  });

  it('should return status code 500 and a message if something fail', async () => {
    const fakeDatabse = new FakeDatabase();
    const getUserPointsMock = new GetUserPoints(fakeDatabse) as jest.Mocked<GetUserPoints>;

    getUserPointsMock.getUserPoints.mockRejectedValue('Something fail');

    const orderController = new GetUserPointController(getUserPointsMock);

    const data = await orderController.handle({
      params: {
        userId: '1'
      }
    });

    expect(data.statusCode).toEqual(500);
    expect(data.body).toEqual('Something fail');
  });
});
