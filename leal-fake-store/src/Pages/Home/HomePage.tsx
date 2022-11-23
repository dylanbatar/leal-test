import { useEffect } from 'react';
import { CardBasic } from '../../Components/Card/CardBasic';
import { postOrdersUser } from '../../Services/Api/postOrdersUser';
import { useAppDispatch, useAppSelector } from '../../global/globales';
import { getOrdersUser } from '../../Services/Api/getOrdersUser';
import { storeInterface } from '../../Store/store';
import { deleteMsgRespOrderBuy } from '../../Store/Slices/ordersUserSlice';
import { ToastContainer, toast } from 'react-toastify';

function HomePage() {
  const dispatch = useAppDispatch();
  const {
    productsOrders: { data: dataOrders },
    respOrderBuy: result,
  } = useAppSelector((store: storeInterface) => store.orders);

  const handleOrder = async (e: Event, data: any) => {
    e.preventDefault();
    dispatch(postOrdersUser(data));
  };

  useEffect(() => {
    dataOrders.length === 0 && dispatch(getOrdersUser);
  }, [dataOrders]);

  useEffect(() => {
    if (result.value !== null) {
      if (result.value === 200) {
        toast.success(result.msg, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          onClose: () => dispatch(deleteMsgRespOrderBuy()),
          onClick: () => dispatch(deleteMsgRespOrderBuy()),
        });
      } else if (result.value === 500) {
        toast.error(result.msg, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          onClose: () => dispatch(deleteMsgRespOrderBuy()),
          onClick: () => dispatch(deleteMsgRespOrderBuy()),
        });
      }
    }
  }, [result]);

  return (
    <div className='mx-8 lg:mx-48 mt-8 mb-24'>
      <ToastContainer />
      <div
        className='flex flex-wrap justify-center 
        md:justify-center lg:justify-center xl:justify-between gap-y-4 '
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
