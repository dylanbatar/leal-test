import { IOrder } from '../../../core/orders/IOrder';
import { IAccumalatePoints } from '../../ports/IAccumulatePoints';
import { IBroker } from '../../ports/IBroker';
import { ICreateAnOrder } from '../../ports/ICreateAnOrder';
import { IRepository } from '../../ports/IRepository';
import { ISpendPoints } from '../../ports/ISpendPoints';
import { SpendPoints } from '../../users/spendPoints/spendPoints';

export class CreateAnOrder implements ICreateAnOrder {
  private readonly repository: IRepository;
  private readonly addPoints: IAccumalatePoints;
  private readonly decreasePoints: ISpendPoints;
  private readonly publisher: IBroker;

  constructor(
    repository: IRepository,
    accumulatePoints: IAccumalatePoints,
    spendPoints: SpendPoints,
    publisher: IBroker
  ) {
    this.repository = repository;
    this.addPoints = accumulatePoints;
    this.decreasePoints = spendPoints;
    this.publisher = publisher;
  }

  async createAnOrder(data: IOrder): Promise<IOrder | null> {
    if (data.payMethod === 'Points') {
      await this.decreasePoints.spendPoints(data.userId, data.total);
    } else {
      await this.addPoints.accumulatePoints(data.userId, data.total);
    }
    await this.repository.createOrder(data);
    this.publisher.publish('sync-database', { type: 'create-order', ...data });
    return data;
  }
}
