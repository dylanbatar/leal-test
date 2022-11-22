import { FakeDatabase } from '../../__mocks__/repository/database';
import { EventsHandle } from './eventsHandle';

jest.mock('../../__mocks__/repository/database');

describe('Events Handle', () => {
  it('should call sync with user data if event type is "update-poinsts"', async () => {
    const eventData = {
      type: 'update-points',
      userId: '1',
      points: 0,
      entity: 'user'
    };
    const fakeDatabase = new FakeDatabase();
    const eventHandle = new EventsHandle(fakeDatabase);

    await eventHandle.handleEvent(eventData);
    expect(fakeDatabase.sync).toBeCalledTimes(1);
    expect(fakeDatabase.sync).toBeCalledWith(eventData);
  });

  it('should call sync with order data if event type is "create-order"', async () => {
    const eventData = {
      payMethod: 'Cash',
      entity: 'order',
      date: 'Mon Nov 21 2022 21:24:59 GMT-0500 (Colombia Standard Time)',
      orderId: 'dbfdeead',
      userId: '1',
      points: 0,
      total: 39300,
      listProducts: ['Smoothie Acai 22oz'],
      type: 'create-order'
    };
    const fakeDatabase = new FakeDatabase();
    const eventHandle = new EventsHandle(fakeDatabase);

    await eventHandle.handleEvent(eventData);
    expect(fakeDatabase.sync).toBeCalledTimes(1);
    expect(fakeDatabase.sync).toBeCalledWith(eventData);
  });

  it('should log a error if something fail', async () => {
    try {
      const eventData = {
        payMethod: 'Cash',
        entity: 'order',
        date: 'Mon Nov 21 2022 21:24:59 GMT-0500 (Colombia Standard Time)',
        orderId: 'dbfdeead',
        userId: '1',
        points: 0,
        total: 39300,
        listProducts: ['Smoothie Acai 22oz'],
        type: 'create-order'
      };
      const fakeDatabase = new FakeDatabase() as jest.Mocked<FakeDatabase>;

      fakeDatabase.sync.mockRejectedValue('Something fail');
      const eventHandle = new EventsHandle(fakeDatabase);

      await eventHandle.handleEvent(eventData);
      expect(fakeDatabase.sync).toBeCalledTimes(1);
      expect(fakeDatabase.sync).toBeCalledWith(eventData);
    } catch (error) {
      expect(error).toEqual('Something fail');
    }
  });
});
