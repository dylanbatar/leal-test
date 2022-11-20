import { IMovement } from '../../../core/movements/IMovement';
import { IGetMovementDetail } from '../../ports/IGetMovementDetail';
import { IRepository } from '../../ports/IRepository';

export class GetMovementDetail implements IGetMovementDetail {
  private readonly repository: IRepository;

  constructor(repository: IRepository) {
    this.repository = repository;
  }

  async getMovementDetail(orderId: string): Promise<IMovement | string> {
    const detail = await this.repository.getOrderDetailById(orderId);

    if (!detail) {
      return "Order doesn't exist";
    }

    return detail;
  }
}
