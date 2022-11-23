import { IOrder } from '../../../core/orders/IOrder';
import { IAccumalatePoints } from '../../ports/IAccumulatePoints';
import { IBroker } from '../../ports/IBroker';
import { ICreateAnOrder } from '../../ports/ICreateAnOrder';
import { IRepository } from '../../ports/IRepository';
import { ISpendPoints } from '../../ports/ISpendPoints';

export class CreateAnOrder implements ICreateAnOrder {
  private readonly repository: IRepository;
  private readonly addPoints: IAccumalatePoints;
  private readonly decreasePoints: ISpendPoints;
  private readonly publisher: IBroker;

  constructor(
    repository: IRepository,
    accumulatePoints: IAccumalatePoints,
    spendPoints: ISpendPoints,
    publisher: IBroker
  ) {
    this.repository = repository;
    this.addPoints = accumulatePoints;
    this.decreasePoints = spendPoints;
    this.publisher = publisher;
  }

  private async spendPoints(userId: string, total: number) {
    const userPoints = await this.decreasePoints.spendPoints(userId, total);

    if (typeof userPoints === 'string') {
      throw userPoints;
    }

    return true;
  }

  private async accumulatePoints(userId: string, total: number) {
    const userPoints = await this.addPoints.accumulatePoints(userId, total);

    if (typeof userPoints === 'string') {
      throw userPoints;
    }

    return true;
  }

  async createAnOrder(data: IOrder): Promise<IOrder | null> {
    let saveOrder = false;
    if (data.payMethod === 'Points') {
      saveOrder = await this.spendPoints(data.userId, data.total);
    } else if (data.payMethod === 'Cash') {
      saveOrder = await this.accumulatePoints(data.userId, data.total);
    }

    if (!saveOrder) {
      return null;
    }

    const order = await this.repository.createOrder(data);
    this.publisher.publish('sync-database', { type: 'create-order', ...order });
    return data;
  }
}
