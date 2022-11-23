import React from 'react'
import { IOrdersHistoryUser } from '../../Interfaces/StoreInterface';
import { IOrderHistoryUser } from '../../Interfaces/OrderUserInterface';

interface props {
    data:IOrderHistoryUser[]
}
export const OrderList = ({data}:props) => {
  return (
    <>
        {data.map((orderHistory) => {
                    return (
                      <ul className=' flex justify-between' key={orderHistory.orderId}>
                        <li>
                          <p>
                            <span>{orderHistory.payMethod}</span>
                          </p>
                        </li>
                        <li>
                          <p>
                            <span>{orderHistory.products.join()}</span>
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
  )
}
