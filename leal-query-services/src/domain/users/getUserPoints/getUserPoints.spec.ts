import { FakeDatabase } from '../../../__mocks__/repository/database';
import { GetUserPoints } from './getUserPoints';
import { IUser } from '../../../core/users/IUser';

jest.mock('../../../__mocks__/repository/database');

describe('Consult User Points', () => {
  const fakeUser: IUser = { firstname: 'Fake name', lastName: 'fake lastname', email: 'fake@email.com', points: 0 };

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should return the user data with the points', async () => {
    const fakeDatabse = new FakeDatabase() as jest.Mocked<FakeDatabase>;
    const getUserPoints = new GetUserPoints(fakeDatabse);
    fakeDatabse.getPointsByUserId.mockResolvedValueOnce(fakeUser);
    const user = (await getUserPoints.getUserPoints('1')) as IUser;

    expect(user).toMatchObject(fakeUser);
    expect(fakeDatabse.getPointsByUserId).toBeCalledTimes(1);
    expect(fakeDatabse.getPointsByUserId).toBeCalledWith('1');
    expect(user.points).toEqual(0);
  });

  test('Should return a string saying "User doesn\'t exist"', async () => {
    const fakeDatabse = new FakeDatabase() as jest.Mocked<FakeDatabase>;
    const getUserPoints = new GetUserPoints(fakeDatabse);
    fakeDatabse.getPointsByUserId.mockResolvedValueOnce(null);
    const user = await getUserPoints.getUserPoints('1');

    expect(fakeDatabse.getPointsByUserId).toBeCalledTimes(1);
    expect(fakeDatabse.getPointsByUserId).toBeCalledWith('1');
    expect(user).toEqual("User doesn't exist");
  });
});
