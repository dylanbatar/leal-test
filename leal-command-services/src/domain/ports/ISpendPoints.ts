import { IUser } from '../../core/users/IUser';

export interface ISpendPoints {
  spendPoints(userId: string, pointsToDecrease: number): Promise<IUser | string>;
}
