export interface IProductOrder {
  titleOrder: string;
  desc: string;
  price: string;
  image: string;
  isCashback: boolean;
}

export interface IOrderHistoryUser {
  orderId: number;
  payMethod: string; // puede ser cash o points
  products: string[]; // es un array pero sabes que te va a venir uno solo
  total: number;
}
