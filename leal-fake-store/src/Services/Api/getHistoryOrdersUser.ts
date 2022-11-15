import OrdersHistoryUserData from "../Data/OrdersHistoryUser.json";

export const getHistoryOrdersUser = async () => {
  //   const resp = await fetch("./OrdersUsers.json");
  //   const result = await resp.json();
  try {
    const result = OrdersHistoryUserData;
    return result;
  } catch (error) {
    console.log(error);
  }
};
