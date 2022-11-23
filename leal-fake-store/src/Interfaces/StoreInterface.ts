 import { IOrderHistoryUser ,IProductOrder} from "./OrderUserInterface";
 import { IUserProfile } from "./UserInterface";

 export interface IOrdersHistoryUser {
  productsOrders:{
    data:IProductOrder[],
    status: string;
    err: {
      msg: string;
    };
  }
  ordersHistoryUser: {
    data: IOrderHistoryUser[];
    status: string;
    err: {
      msg: string;
    };
  };
  pointsOrder: number;
  respOrderBuy: {
    status:string,
    value: number|null
    msg: string
  };
}

export interface IAuthUser {
  userInfo: {
    data: IUserProfile,
    status: string,  
    err: {
      msg: string,
    },
  }
}