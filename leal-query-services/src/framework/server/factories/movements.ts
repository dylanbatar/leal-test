import { GetMovementDetailController } from "../../../application/movements/getMovementDetailController";
import { GetMovementDetail } from "../../../domain/movements/GetMovementDetail/getMovementDetail";
import { InMemory as InMemoryDB } from "../../database/inMemory/inMemory";

export const makeGetMovementDetail = (): GetMovementDetailController => {
  const inMemoryDb = new InMemoryDB();
  const getMovementDetail = new GetMovementDetail(inMemoryDb);
  const getMovementDetailControl = new GetMovementDetailController(getMovementDetail);
  return getMovementDetailControl;
};
