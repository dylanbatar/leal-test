import OrdersUsersData from "../Data/OrdersUsers.json";

export const getOrdersUser = async () => {
  try {
    const result = OrdersUsersData;
    return result;
  } catch (error) {
    console.log(error);
  }
};
