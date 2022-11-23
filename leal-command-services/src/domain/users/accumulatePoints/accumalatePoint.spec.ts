import { IUser } from '../../../core/users/IUser';
import { FakeBroker } from '../../../__mocks__/messageBroker/broker';
import { FakeDatabase } from '../../../__mocks__/repository/database';
import { AccumulatePoints } from './accumulatePoints';

jest.mock('../../../__mocks__/messageBroker/broker');
jest.mock('../../../__mocks__/repository/database');

describe('Accumulate points', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add points to specific user', async () => {
    const userQueryReturn: IUser = {
      firstName: 'fake name',
      lastName: 'fake lastname',
      email: 'fake@email.com',
      points: 0
    };

    const fakeDatabase = new FakeDatabase() as jest.Mocked<FakeDatabase>;
    const fakeMessageBroker = new FakeBroker();

    fakeDatabase.findUserById.mockResolvedValue(userQueryReturn);

    const accumulatePoints = new AccumulatePoints(fakeDatabase, fakeMessageBroker);
    const response = (await accumulatePoints.accumulatePoints('1', 5000)) as IUser;

    expect(response.points).toEqual(5);
    expect(fakeDatabase.addPoints).toBeCalledWith('1', 5);
    expect(fakeDatabase.addPoints).toBeCalledTimes(1);
    expect(fakeMessageBroker.publish).toBeCalledWith('sync-database', {
      type: 'update-points',
      userId: '1',
      points: 5
    });
  });

  it('should return message saying "User doesn\'t exist" if the ID doesn\'t in the DB', async () => {
    const fakeDatabase = new FakeDatabase() as jest.Mocked<FakeDatabase>;
    const fakeMessageBroker = new FakeBroker();

    fakeDatabase.findUserById.mockResolvedValue(null);

    const accumulatePoints = new AccumulatePoints(fakeDatabase, fakeMessageBroker);
    const response = await accumulatePoints.accumulatePoints('1', 5000);

    expect(response).toEqual("User doesn't exists");
    expect(fakeDatabase.addPoints).not.toBeCalled();
    expect(fakeMessageBroker.publish).not.toBeCalled();
  });
});
