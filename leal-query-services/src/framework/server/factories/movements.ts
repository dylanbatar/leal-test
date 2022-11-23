import { GetAllMovementOfUserController } from '../../../application/movements/getAllMovementOfUserController';
import { GetMovementDetailController } from '../../../application/movements/getMovementDetailController';
import { GetAllMovementOfUser } from '../../../domain/movements/getAllMovementOfUser/getAllMovementOfUser';
import { GetMovementDetail } from '../../../domain/movements/GetMovementDetail/getMovementDetail';
import { DynamoDBRead } from '../../database/dynamoDB/dynamoDB';

export const makeGetMovementDetail = (): GetMovementDetailController => {
  const dynamoDB = new DynamoDBRead();
  const getMovementDetail = new GetMovementDetail(dynamoDB);
  const getMovementDetailControl = new GetMovementDetailController(getMovementDetail);
  return getMovementDetailControl;
};

export const makeGetAllMovementOfUser = (): GetAllMovementOfUserController => {
  const dynamoDB = new DynamoDBRead();
  const getAllMovementOfUser = new GetAllMovementOfUser(dynamoDB);
  const getAllMovementOfUserController = new GetAllMovementOfUserController(getAllMovementOfUser);
  return getAllMovementOfUserController;
};
