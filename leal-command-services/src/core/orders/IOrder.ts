export interface IOrder {
  userId: string;
  total: number;
  payMethod: string;
  points: number;
  listProducts: string[];
}
