import { IUser } from '../../core/users/IUser';
import { Controller } from '../ports/controller';
import { HttpRequest, httpResponse } from '../ports/http';
import { ServerError, SuccessRequest } from '../helpers/http.helper';
import { IGetUserPoints } from '../../domain/ports/IGetUserPoints';

export class GetUserPointController implements Controller {
  private readonly getUserPoints: IGetUserPoints;

  constructor(getUserPoints: IGetUserPoints) {
    this.getUserPoints = getUserPoints;
  }

  async handle(req: HttpRequest): Promise<httpResponse> {
    try {
      const { userId } = req.params;
      const data = await this.getUserPoints.getUserPoints(userId);
      return SuccessRequest<IUser | string>(data);
    } catch (error) {
      return ServerError(error);
    }
  }
}
