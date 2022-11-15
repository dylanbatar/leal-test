export interface IPublishData {
  Publish(topic: string, message: any, callback: Function): Promise<void>;
}
