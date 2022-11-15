import { IMovement } from '../../../core/movements/IMovement';
import { IGetMovementDetail } from '../../ports/IGetMovementDetail';
import { IRepository } from '../../ports/IRepository';

export class GetMovementDetail implements IGetMovementDetail {
  private readonly repository: IRepository;

  constructor(repository: IRepository) {
    this.repository = repository;
  }

  async getMovementDetail(orderId: string): Promise<IMovement | null> {
    const detail = await this.repository.getOrderDetailById(orderId);

    if (!detail) {
      return null;
    }

    return detail;
  }
}
