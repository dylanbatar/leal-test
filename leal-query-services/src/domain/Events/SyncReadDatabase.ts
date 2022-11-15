import { IBroker } from '../ports/IBroker';
import { IRepository } from '../ports/IRepository';
import { ISyncDatabase } from '../ports/ISyncDatabase';

export class SyncDatabase implements ISyncDatabase {
  private readonly broker: IBroker;
  private readonly database: IRepository;

  constructor(broker: IBroker, database: IRepository) {
    this.broker = broker;
    this.database = database;
  }

  async handleEvent(data: any): Promise<void> {
    if (data.type === 'update-points') {
      await this.database.sync({
        userId: data.userId,
        points: data.points,
        entity: 'user'
      });
    } else if (data.type === 'create-order') {
      await this.database.sync({
        userId: data.userId,
        points: data.points,
        entity: 'order',
        orderId: data.orderId,
        payMethod: data.payMethod,
        total: data.total,
        products: data.listProduct,
        date: data.date
      });
    }
  }

  async listenMessageQueue(topic: string): Promise<void> {
    await this.broker.listen(topic, this.handleEvent);
  }
}
