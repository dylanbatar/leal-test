import { IUser } from '../../../core/users/IUser';
import { IGetUserPoints } from '../../ports/IGetUserPointS';
import { IRepository } from '../../ports/IRepository';

export class GetUserPoints implements IGetUserPoints {
  private readonly repository: IRepository;

  constructor(repository: IRepository) {
    this.repository = repository;
  }

  async getUserPoints(userId: string): Promise<IUser | null> {
    const points = await this.repository.getPointsByUserId(userId);

    if (!points) {
      return null;
    }

    return points;
  }
}
