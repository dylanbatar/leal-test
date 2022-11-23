import { FakeBroker } from '../../__mocks__/messageBroker/broker';
import { FakeDatabase } from '../../__mocks__/repository/database';
import { SendData } from './PublishData';

jest.mock('../../__mocks__/messageBroker/broker');
jest.mock('../../__mocks__/repository/database');

describe('Publid Data', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should send the message to broker', async () => {
    const fakeMessageBroker = new FakeBroker() as jest.Mocked<FakeBroker>;
    const fakeDatabase = new FakeDatabase();

    const sendData = new SendData(fakeMessageBroker, fakeDatabase);
    sendData.Publish('test-topic', 'test message');

    expect(fakeMessageBroker.publish).toBeCalledWith('test-topic', 'test message');
  });
});
