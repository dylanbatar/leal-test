import { IUser } from '../../core/users/IUser';

export interface IAccumalatePoints {
  accumulatePoints(userId: string, price: number): Promise<IUser | string>;
}
