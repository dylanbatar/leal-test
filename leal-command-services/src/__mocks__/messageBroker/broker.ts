import { IBroker } from '../../domain/ports/IBroker';

export class FakeBroker implements IBroker {
  publish(topic: string, message: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
