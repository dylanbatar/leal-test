import { Kafka, Partitioners } from 'kafkajs';
import { IBroker } from '../../domain/ports/IBroker';

export class KafkaBroker implements IBroker {
  private readonly kafkaInstance: Kafka;

  constructor(clientId: string, ports: string[]) {
    this.kafkaInstance = new Kafka({
      clientId,
      brokers: ports
    });
  }

  async publish(topic: string, message: any): Promise<void> {
    const producer = this.kafkaInstance.producer({ createPartitioner: Partitioners.LegacyPartitioner });
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message), partition: 0 }]
    });
    console.info('saving data');
  }
}
