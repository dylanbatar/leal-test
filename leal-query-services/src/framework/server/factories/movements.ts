import { GetMovementDetailController } from '../../../application/movements/getMovementDetailController';
import { GetMovementDetail } from '../../../domain/movements/GetMovementDetail/getMovementDetail';
import { DynamoDBRead } from '../../database/dynamoDB/dynamoDB';

export const makeGetMovementDetail = (): GetMovementDetailController => {
  const dynamoDB = new DynamoDBRead();
  const getMovementDetail = new GetMovementDetail(dynamoDB);
  const getMovementDetailControl = new GetMovementDetailController(getMovementDetail);
  return getMovementDetailControl;
};
