import { IMovement } from '../../core/movements/IMovement';
import { IGetMovementDetail } from '../../domain/ports/IGetMovementDetail';
import { Controller } from '../ports/controller';
import { ServerError, SuccessRequest } from '../helpers/http.helper';
import { HttpRequest, httpResponse } from '../ports/http';

export class GetMovementDetailController implements Controller {
  private readonly getMovementDetailUseCase: IGetMovementDetail;

  constructor(getMovementDetailUseCase) {
    this.getMovementDetailUseCase = getMovementDetailUseCase;
  }

  async handle(req: HttpRequest): Promise<httpResponse> {
    try {
      const { orderId } = req.params;
      const data = await this.getMovementDetailUseCase.getMovementDetail(orderId);
      return SuccessRequest<IMovement>(data);
    } catch (error) {
      return ServerError(error);
    }
  }
}
