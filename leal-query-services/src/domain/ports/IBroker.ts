export interface IBroker {
  listen(topic: string,callback: Function): Promise<void>;
}
