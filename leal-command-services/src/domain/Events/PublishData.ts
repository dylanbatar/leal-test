import { IBroker } from '../ports/IBroker';
import { IRepository } from '../ports/IRepository';
import { IPublishData } from '../ports/IPublish';

export class SendData implements IPublishData {
  private readonly broker: IBroker;
  private readonly database: IRepository;

  constructor(broker: IBroker, database: IRepository) {
    this.broker = broker;
    this.database = database;
  }

  async Publish(topic: string, message: any): Promise<void> {
    await this.broker.publish(topic, message);
  }
}
