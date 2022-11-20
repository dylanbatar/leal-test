import { EventsHandle } from '../../../domain/Events/eventsHandle';
import { SyncDatabase } from '../../../domain/Events/SyncReadDatabase';
import { DynamoDBRead } from '../../database/dynamoDB/dynamoDB';
import { KafkaBroker } from '../../events/kafka';

const { KAFKA_CLIENT_ID, KAFKA_BROKER_URL } = process.env;

export const makeSyncDatabase = () => {
  const dynamoDB = new DynamoDBRead();
  const eventHandle = new EventsHandle(dynamoDB);
  const kafkaBroker = new KafkaBroker(KAFKA_CLIENT_ID, [KAFKA_BROKER_URL], eventHandle);
  const makeSyncDatabaseUseCase = new SyncDatabase(kafkaBroker);
  makeSyncDatabaseUseCase.listenMessageQueue('sync-database');
};
