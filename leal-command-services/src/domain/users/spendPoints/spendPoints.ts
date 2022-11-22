import { ISpendPoints } from '../../ports/ISpendPoints';
import { IRepository } from '../../ports/IRepository';
import { IBroker } from '../../ports/IBroker';
import { IUser } from '../../../core/users/IUser';

export class SpendPoints implements ISpendPoints {
  private readonly repository: IRepository;
  private readonly broker: IBroker;

  constructor(repository: IRepository, broker: IBroker) {
    this.repository = repository;
    this.broker = broker;
  }

  async spendPoints(userId: string, total: number): Promise<IUser | string> {
    const user = await this.repository.findUserById(userId);
    const pointsToDecrease = total / 1000;

    if (!user) {
      return "User doesn't exists";
    }

    if (user.points < pointsToDecrease) {
      return 'Insufficient founds';
    }

    await this.repository.decreasePoints(userId, pointsToDecrease);
    this.broker.publish('sync-database', { type: 'update-points', userId, points: user.points - pointsToDecrease });

    return user;
  }
}
