import { IMovement } from '../../core/movements/IMovement';

export interface IGetMovementDetail {
  getMovementDetail(orderId: string): Promise<IMovement | null>;
}
