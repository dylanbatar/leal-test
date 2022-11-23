import { GetUserPointController } from '../../../application/users/getUserPointController';
import { GetUserPoints } from '../../../domain/users/getUserPoints/getUserPoints';
import { DynamoDBRead } from '../../database/dynamoDB/dynamoDB';

export const makeGetUserPoints = (): GetUserPointController => {
  const dynamoDB = new DynamoDBRead();
  const getUsePointsUseCase = new GetUserPoints(dynamoDB);
  const getUserPointController = new GetUserPointController(getUsePointsUseCase);
  return getUserPointController;
};
