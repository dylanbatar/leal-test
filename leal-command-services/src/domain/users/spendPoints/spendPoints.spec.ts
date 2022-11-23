import { IUser } from '../../../core/users/IUser';
import { FakeBroker } from '../../../__mocks__/messageBroker/broker';
import { FakeDatabase } from '../../../__mocks__/repository/database';
import { SpendPoints } from './spendPoints';

jest.mock('../../../__mocks__/messageBroker/broker');
jest.mock('../../../__mocks__/repository/database');

describe('Spend points', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should remove points to specific user', async () => {
    const userQueryReturn: IUser = {
      firstName: 'fake name',
      lastName: 'fake lastname',
      email: 'fake@email.com',
      points: 5
    };

    const fakeDatabase = new FakeDatabase() as jest.Mocked<FakeDatabase>;
    const fakeMessageBroker = new FakeBroker();

    fakeDatabase.findUserById.mockResolvedValue(userQueryReturn);

    const spendPoints = new SpendPoints(fakeDatabase, fakeMessageBroker);
    const response = (await spendPoints.spendPoints('1', 5000)) as IUser;

    expect(response.points).toEqual(0);
    expect(fakeDatabase.decreasePoints).toBeCalledWith('1', 5);
    expect(fakeDatabase.decreasePoints).toBeCalledTimes(1);
    expect(fakeMessageBroker.publish).toBeCalledWith('sync-database', {
      type: 'update-points',
      userId: '1',
      points: 0
    });
  });

  it('should return message saying "User doesn\'t exist" if the ID doesn\'t in the DB', async () => {
    const fakeDatabase = new FakeDatabase() as jest.Mocked<FakeDatabase>;
    const fakeMessageBroker = new FakeBroker();

    fakeDatabase.findUserById.mockResolvedValue(null);

    const spendPoints = new SpendPoints(fakeDatabase, fakeMessageBroker);
    const response = await spendPoints.spendPoints('1', 5000);

    expect(response).toEqual("User doesn't exists");
    expect(fakeDatabase.decreasePoints).not.toBeCalled();
    expect(fakeMessageBroker.publish).not.toBeCalled();
  });

  it('should return message saying "Insufficient founds" if points are insufficient to buy', async () => {
    const userQueryReturn: IUser = {
      firstName: 'fake name',
      lastName: 'fake lastname',
      email: 'fake@email.com',
      points: 1
    };
    const fakeDatabase = new FakeDatabase() as jest.Mocked<FakeDatabase>;
    const fakeMessageBroker = new FakeBroker();

    fakeDatabase.findUserById.mockResolvedValue(userQueryReturn);

    const spendPoints = new SpendPoints(fakeDatabase, fakeMessageBroker);
    const response = await spendPoints.spendPoints('1', 5000);

    expect(response).toEqual('Insufficient founds');
    expect(fakeDatabase.decreasePoints).not.toBeCalled();
    expect(fakeMessageBroker.publish).not.toBeCalled();
  });
});
