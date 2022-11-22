import { FakeBroker } from '../../__mocks__/messageBroker/broker';
import { SyncDatabase } from './SyncReadDatabase';

jest.mock('../../__mocks__/messageBroker/broker');

describe('Sync Read Database', () => {
  test('should suscribe to a topic', async () => {
    const fakeBroker = new FakeBroker();
    const syncDatabase = new SyncDatabase(fakeBroker);
    await syncDatabase.listenMessageQueue('fake channel');

    expect(fakeBroker.listen).toBeCalledTimes(1);
  });
});
