import { SyncDatabase } from '../../../domain/Events/SyncReadDatabase';
import { InMemory as InMemoryDB } from '../../database/inMemory/inMemory';
import { KafkaBroker } from '../../events/kafka';

export const makeSyncDatabase = () => {
  const inMemoryDB = new InMemoryDB();
  const kafkaBroker = new KafkaBroker('leal-service-app', ['localhost:9092']);
  const makeSyncDatabaseUseCase = new SyncDatabase(kafkaBroker, inMemoryDB);
  makeSyncDatabaseUseCase.listenMessageQueue('sync-database');
};
