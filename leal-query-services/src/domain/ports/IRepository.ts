import { IMovement } from '../../core/movements/IMovement';
import { IUser } from '../../core/users/IUser';

export interface IRepository {
  getPointsByUserId(userId: string): Promise<IUser | null>;
  getOrderDetailById(orderId: string): Promise<IMovement | null>;
  getAllOrderByUserId(userId: string): Promise<IMovement[]>;
  sync(data: any): Promise<void>;
}
