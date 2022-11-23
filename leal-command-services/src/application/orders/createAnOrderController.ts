import { IOrder } from '../../core/orders/IOrder';
import { ICreateAnOrder } from '../../domain/ports/ICreateAnOrder';
import { Controller } from '../ports/controller';
import { ServerError, SuccessRequest } from '../helpers/http.helper';
import { HttpRequest, httpResponse } from '../ports/http';

export class CreateAnOrderController implements Controller {
  private readonly createAnOrderUseCase: ICreateAnOrder;

  constructor(createAnOrderUseCase: ICreateAnOrder) {
    this.createAnOrderUseCase = createAnOrderUseCase;
  }

  async handle(req: HttpRequest): Promise<httpResponse> {
    try {
      const { userId, total, payMethod, points, listProducts } = req.body;
      const data = await this.createAnOrderUseCase.createAnOrder({ userId, total, payMethod, points, listProducts });
      return SuccessRequest<IOrder>(data);
    } catch (error) {
      return ServerError(error);
    }
  }
}
