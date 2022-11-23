import { IMovement } from '../../core/movements/IMovement';
import { Controller } from '../ports/controller';
import { ServerError, SuccessRequest } from '../helpers/http.helper';
import { HttpRequest, httpResponse } from '../ports/http';
import { IGetAllMovementOfUser } from '../../domain/ports/IGetAllMovementOfUser';

export class GetAllMovementOfUserController implements Controller {
  private readonly getAllMovementUseCase: IGetAllMovementOfUser;

  constructor(getAllMovementUseCase: IGetAllMovementOfUser) {
    this.getAllMovementUseCase = getAllMovementUseCase;
  }

  async handle(req: HttpRequest): Promise<httpResponse> {
    try {
      const { userId } = req.params;
      const data = await this.getAllMovementUseCase.getAll(userId);
      return SuccessRequest<IMovement[]>(data);
    } catch (error) {
      return ServerError(error);
    }
  }
}
