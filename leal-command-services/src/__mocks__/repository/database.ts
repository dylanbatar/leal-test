import { IOrder } from '../../core/orders/IOrder';
import { IUser } from '../../core/users/IUser';
import { IRepository } from '../../domain/ports/IRepository';

export class FakeDatabase implements IRepository {
  put(data: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findUserById(userId: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  addPoints(userId: string, pointsToAdd: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  decreasePoints(userId: string, pointsToDecrease: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createOrder(order: IOrder): Promise<IOrder> {
    throw new Error('Method not implemented.');
  }
}
