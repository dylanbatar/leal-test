import { Kafka } from 'kafkajs';

import { IBroker } from '../../domain/ports/IBroker';

export class KafkaBroker implements IBroker {
  private readonly kafkaInstance: Kafka;
  private readonly eventHandle: any;

  constructor(clientId: string, ports: string[], eventHandle: any) {
    this.kafkaInstance = new Kafka({
      clientId,
      brokers: ports
    });
    this.eventHandle = eventHandle;
  }

  async listen(topic: string): Promise<void> {
    const consumer = this.kafkaInstance.consumer({ groupId: 'test_topic' });
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.info({
          partition,
          offset: message.offset,
          value: message.value.toString()
        });

        const dataToSync = JSON.parse(message.value.toString());
        await this.eventHandle.handleEvent(dataToSync);
      }
    });
  }
}
