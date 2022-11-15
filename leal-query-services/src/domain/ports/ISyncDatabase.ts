export interface ISyncDatabase {
  listenMessageQueue(topic: string): Promise<void>;
}
