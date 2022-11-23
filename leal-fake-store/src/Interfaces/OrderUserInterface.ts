export interface IProductOrder {
  titleOrder: string;
  desc: string;
  price: string;
  image: string;
  isCashback: boolean;
}

export interface IOrderHistoryUser {
  orderId: number;
  payMethod: string;
  products: string[];
  total: number;
}
