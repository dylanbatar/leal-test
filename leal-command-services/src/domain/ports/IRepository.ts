import { IOrder } from '../../core/orders/IOrder';
import { IUser } from '../../core/users/IUser';

export interface IRepository {
  put(data: any): Promise<void>;
  findUserById(userId: string): Promise<IUser>;
  addPoints(userId: string, pointsToAdd: number): Promise<void>;
  decreasePoints(userId: string, pointsToDecrease: number): Promise<void>;
  createOrder(order: IOrder): Promise<IOrder>;
}
