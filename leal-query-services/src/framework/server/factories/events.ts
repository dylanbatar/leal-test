import { EventsHandle } from '../../../domain/Events/eventsHandle';
import { SyncDatabase } from '../../../domain/Events/SyncReadDatabase';
import { DynamoDBRead } from '../../database/dynamoDB/dynamoDB';
import { KafkaBroker } from '../../events/kafka';

export const makeSyncDatabase = () => {
  const dynamoDB = new DynamoDBRead();
  const eventHandle = new EventsHandle(dynamoDB);
  const kafkaBroker = new KafkaBroker('leal-service-app', ['localhost:9092'], eventHandle);
  const makeSyncDatabaseUseCase = new SyncDatabase(kafkaBroker, dynamoDB);
  makeSyncDatabaseUseCase.listenMessageQueue('sync-database');
};
