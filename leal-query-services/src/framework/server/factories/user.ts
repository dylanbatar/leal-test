import { GetUserPointController } from '../../../application/users/getUserPointController';
import { GetUserPoints } from '../../../domain/users/getUserPoints/getUserPoints';
import { DynamoDBRead } from '../../database/dynamoDB/dynamoDB';
import { InMemory as InMemoryDB } from '../../database/inMemory/inMemory';

export const makeGetUserPoints = (): GetUserPointController => {
  const inMemoryDB = new InMemoryDB();
  const dynamoDB = new DynamoDBRead();
  const getUsePointsUseCase = new GetUserPoints(dynamoDB);
  const getUserPointController = new GetUserPointController(getUsePointsUseCase);
  return getUserPointController;
};