export interface IBroker {
  publish(topic: string, message: any): Promise<void>;
}
