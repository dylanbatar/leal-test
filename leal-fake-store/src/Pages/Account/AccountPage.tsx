import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { OrdersHistoryUser } from "../../Interfaces/OrderUserInterface";
import { UserProfileInterface } from "../../Interfaces/UserInterface";
import { getHistoryOrdersUser } from "../../Services/Api/getHistoryOrdersUser";
import { getInfoUser } from "../../Services/Api/getInfoUser";
import { pointsOrder } from "../../Store/Slices/ordersUserSlice";

function AccountPage() {
  const dispatch = useDispatch();
  const [dataOrdersHistory, setDataOrdersHistory] = useState<OrdersHistoryUser[]>([]);
  const [dataUser, setDataUser] = useState<UserProfileInterface>();
  const getOrdersData = async () => {
    const [dataOrdersHistory, dataUser] = await Promise.all([
      await getHistoryOrdersUser(),
      await getInfoUser(),
    ]);

    try {
      setDataUser(dataUser.data);
      if (dataOrdersHistory !== undefined) setDataOrdersHistory(dataOrdersHistory);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getOrdersData();
  }, []);

  useEffect(() => {
    dispatch(pointsOrder(dataUser?.points));
  }, [dataUser?.points]);
  return (
    <main className="w-80 md:w-96 mt-10">
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="mb-3 w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <img
                    alt="..."
                    src="https://media-exp1.licdn.com/dms/image/D4E03AQF2In59xq4a5A/profile-displayphoto-shrink_100_100/0/1649171440434?e=1674086400&v=beta&t=09_wFA2rJCU6TGQMht0-bpwGzAar8450i0xRjIZFJcs"
                    className="h-32 shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                  />
                </div>
              </div>
              <div className="text-center mt-8">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {dataUser?.name} {dataUser?.lastName}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  Cartagena, Bolivar
                </div>
                <div className="mb-2 text-blueGray-600 mt-2">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  {dataUser?.email}
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  Points - {dataUser?.points}
                </div>
              </div>

              <div className="my-8">
                <h3 className="font-black text-gray-700">Historial de pedidos</h3>

                <div className="mt-2 flex flex-row overflow-auto whitespace-nowrap gap-8">
                  {dataOrdersHistory.map((orderHistory) => {
                    return (
                      <ul className="mr-6 " key={orderHistory.orderId}>
                        <li>
                          <p>
                            Metode pago - <span>{orderHistory.payMethod}</span>
                          </p>
                        </li>
                        <li>
                          <p>
                            Productos: <span>{orderHistory.products.join()}</span>
                          </p>
                        </li>
                        <li>
                          <p>
                            Total - <span>{orderHistory.total}</span>
                          </p>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AccountPage;
