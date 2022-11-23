import { IMovement } from '../../core/movements/IMovement';
import { IUser } from '../../core/users/IUser';
import { IRepository } from '../../domain/ports/IRepository';

export class FakeDatabase implements IRepository {
  getAllOrderByUserId(userId: string): Promise<IMovement[]> {
    throw new Error('Method not implemented.');
  }
  getPointsByUserId(userId: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  getOrderDetailById(orderId: string): Promise<IMovement> {
    throw new Error('Method not implemented.');
  }
  sync(data: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
