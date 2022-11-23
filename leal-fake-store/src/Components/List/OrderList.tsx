import { IOrderHistoryUser } from '../../Interfaces/OrderUserInterface';

interface props {
  data: any[];
}
export const OrderList = ({ data }: props) => {
  return (
    <>
      {data.length && data.map((orderHistory) => {
        return (
          <ul className=' flex justify-between' key={orderHistory.orderId}>
            <li>
              <p>
                <span>{orderHistory.payMethod}</span>
              </p>
            </li>
            <li>
              <p>
                <span>{orderHistory.listProducts}</span>
              </p>
            </li>
            <li>
              <p>
                <span>{orderHistory.total}</span>
              </p>
            </li>
          </ul>
        );
      })}
    </>
  );
};
