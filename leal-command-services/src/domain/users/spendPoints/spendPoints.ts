import { ISpendPoints } from '../../ports/ISpendPoints';
import { IRepository } from '../../ports/IRepository';
import { IBroker } from '../../ports/IBroker';

export class SpendPoints implements ISpendPoints {
  private readonly repository: IRepository;
  private readonly broker: IBroker;

  constructor(repository: IRepository, broker: IBroker) {
    this.repository = repository;
    this.broker = broker;
  }

  async spendPoints(userId: string, total: number): Promise<string> {
    const user = await this.repository.findUserById(userId);

    if (!user) {
      throw "User doesn't exists";
    }

    const pointsToDecrease = total / 1000;

    await this.repository.decreasePoints(userId, pointsToDecrease);
    this.broker.publish('sync-database', { type: 'update-points', userId, points: user.points - pointsToDecrease });

    return 'Points spent';
  }
}
