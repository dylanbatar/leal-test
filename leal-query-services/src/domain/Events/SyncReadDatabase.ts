import { IBroker } from '../ports/IBroker';
import { ISyncDatabase } from '../ports/ISyncDatabase';

export class SyncDatabase implements ISyncDatabase {
  private readonly broker: IBroker;

  constructor(broker: IBroker) {
    this.broker = broker;
  }

  async listenMessageQueue(topic: string): Promise<void> {
    await this.broker.listen(topic);
  }
}
