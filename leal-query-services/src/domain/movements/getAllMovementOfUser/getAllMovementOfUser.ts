import { IMovement } from '../../../core/movements/IMovement';
import { IGetAllMovementOfUser } from '../../ports/IGetAllMovementOfUser';
import { IRepository } from '../../ports/IRepository';

export class GetAllMovementOfUser implements IGetAllMovementOfUser {
  private readonly repository: IRepository;

  constructor(repository: IRepository) {
    this.repository = repository;
  }

  async getAll(userId: string): Promise<IMovement[]> {
    const orders = await this.repository.getAllOrderByUserId(userId);

    if (!orders.length) {
      return [];
    }

    return orders;
  }
}
