import OrdersHistoryUserData from "../Data/OrdersHistoryUser.json";

export const getHistoryOrdersUser = async () => {
  try {
    const result = OrdersHistoryUserData;
    return result;
  } catch (error) {
    console.log(error);
  }
};
