import { IUser } from '../../../core/users/IUser';
import { IMovement } from '../../../core/movements/IMovement';
import { IRepository } from '../../../domain/ports/IRepository';

export class InMemory implements IRepository {
  constructor() {}

  async getPointsByUserId(userId: string): Promise<IUser> {
    return;
  }

  async getOrderDetailById(orderId: string): Promise<IMovement> {
    return;
  }

  async sync(data: any): Promise<void> {}
}
