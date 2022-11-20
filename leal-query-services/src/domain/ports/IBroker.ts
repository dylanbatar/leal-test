export interface IBroker {
  listen(topic: string): Promise<void>;
}
