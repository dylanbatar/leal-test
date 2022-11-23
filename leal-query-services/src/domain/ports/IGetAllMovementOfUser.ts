import { IMovement } from '../../core/movements/IMovement';

export interface IGetAllMovementOfUser {
  getAll(userId: string): Promise<IMovement[]>;
}
