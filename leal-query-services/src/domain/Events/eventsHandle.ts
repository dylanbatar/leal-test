import { IRepository } from '../ports/IRepository';

export class EventsHandle {
  private readonly repository: IRepository;
  constructor(repository: IRepository) {
    this.repository = repository;
  }

  async handleEvent(data: any): Promise<void> {
    try {
      if (data.type === 'update-points') {
        await this.repository.sync({
          type: data.type,
          userId: data.userId,
          points: data.points,
          entity: 'user'
        });
      } else if (data.type === 'create-order') {
        await this.repository.sync({
          type: data.type,
          userId: data.userId,
          points: data.points,
          entity: 'order',
          orderId: data.orderId,
          payMethod: data.payMethod,
          total: data.total,
          listProducts: data.listProducts,
          date: data.date
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
