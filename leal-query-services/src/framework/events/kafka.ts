import { Kafka } from 'kafkajs';

import { IBroker } from '../../domain/ports/IBroker';

export class KafkaBroker implements IBroker {
  private readonly kafkaInstance: Kafka;

  constructor(clientId: string, ports: string[]) {
    this.kafkaInstance = new Kafka({
      clientId,
      brokers: ports
    });
  }

  async listen(topic: string, callback: Function): Promise<void> {
    const consumer = this.kafkaInstance.consumer({ groupId: 'test_topic', });
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString()
        });

        const dataToSync = JSON.parse(message.value.toString())
        await callback(dataToSync);
      }
    });
  }
}
