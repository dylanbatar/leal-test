import OrdersUsersData from "../Data/OrdersUsers.json";

export const getOrdersUser = async () => {
  //   const resp = await fetch("./OrdersUsers.json");
  //   const result = await resp.json();
  try {
    const result = OrdersUsersData;
    return result;
  } catch (error) {
    console.log(error);
  }
};
