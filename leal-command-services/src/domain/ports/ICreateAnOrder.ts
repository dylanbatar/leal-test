import { IOrder } from '../../core/orders/IOrder';

export interface ICreateAnOrder {
  createAnOrder(order: IOrder): Promise<IOrder | null>;
}
