import { useEffect, useState } from "react";
import { AlertError } from "../../Components/Alerts/AlertError";
import { CardBasic } from "../../Components/Card/CardBasic";
import { OrderUserInterface } from "../../Interfaces/OrderUserInterface";
import { getOrdersUser } from "../../Services/Api/getOrdersUser";
import { postOrdersUser } from "../../Services/Api/postOrdersUser";

function HomePage() {
  const [dataOrders, setDataOrders] = useState<OrderUserInterface[]>([]);
  const [alert, setAlert] = useState({
    status: false,
    msg: "",
    bgColor: "teal",
  });

  const { status, msg, bgColor } = alert;

  const getOrdersData = async () => {
    const result = await getOrdersUser();
    if (result !== undefined) {
      setDataOrders(result);
    }
  };

  const handleOrder = async (data: any) => {
    const result = await postOrdersUser(data);

    if (result?.status === 200) {
      setAlert({
        ...alert,
        status: true,
        msg: "Gracias por su compra !! :)",
        bgColor: "teal",
      });
    } else {
      setAlert({
        ...alert,
        status: true,
        msg: "Hubo un error en tu compra, Intenta nuevamente",
        bgColor: "red",
      });
    }
  };

  useEffect(() => {
    getOrdersData();
  }, []);

  return (
    <div className="mx-8 lg:mx-48 mt-8 mb-24">
      {alert.status && (
        <div className="mb-3">
          <AlertError
            msg={msg}
            bgColor={bgColor}
            action={() => setAlert({ ...alert, status: false })}
          />
        </div>
      )}
      <div
        className="flex flex-wrap justify-center 
        md:justify-center lg:justify-center xl:justify-between gap-y-4 "
      >
        {dataOrders.map((order, index) => {
          return (
            <div key={index}>
              <CardBasic orderUser={order} action={handleOrder} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
