import { IAccumalatePoints } from '../../ports/IAccumulatePoints';
import { IBroker } from '../../ports/IBroker';
import { IRepository } from '../../ports/IRepository';

export class AccumulatePoints implements IAccumalatePoints {
  private readonly repository: IRepository;
  private readonly broker: IBroker;

  private readonly POINTS_PER_ORDER: 1000;

  constructor(repository: IRepository, broker: IBroker) {
    this.repository = repository;
    this.broker = broker;
  }

  async accumulatePoints(userId: string, price: number): Promise<string> {
    const user = await this.repository.findUserById(userId);

    if (!user) {
      throw "User doesn't exists";
    }

    const pointsToAdd = price / this.POINTS_PER_ORDER;
    await this.repository.addPoints(userId, pointsToAdd);
    this.broker.publish('sync-database', { type: 'update-points', userId, points: user.points + pointsToAdd });
    return 'Points added';
  }
}
