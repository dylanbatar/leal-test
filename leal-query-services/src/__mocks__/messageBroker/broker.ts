import { IBroker } from '../../domain/ports/IBroker';

export class FakeBroker implements IBroker {
  listen(topic: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
