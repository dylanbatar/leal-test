import { useEffect, useState } from "react";
import { CardBasic } from "../../Components/Card/CardBasic";
import { OrderUserInterface } from "../../Interfaces/OrderUserInterface";
import { getOrdersUser } from "../../Services/Api/getOrdersUser";

function HomePage() {
  const [dataOrders, setDataOrders] = useState<OrderUserInterface[]>([]);

  const getOrdersData = async () => {
    const result = await getOrdersUser();
    if (result !== undefined) {
      setDataOrders(result);
    }
  };

  useEffect(() => {
    getOrdersData();
  }, []);

  return (
    <div className="mx-8 lg:mx-48 mt-8 mb-24">
      <div
        className="flex flex-wrap justify-center 
        md:justify-center lg:justify-center xl:justify-between gap-y-4 "
      >
        {dataOrders.map((order, index) => {
          return (
            <div key={index}>
              <CardBasic orderUser={order} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
