import { useState } from 'react';
import { userId } from '../../global/globales';
import { IProductOrder } from '../../Interfaces/OrderUserInterface';
import { formatedNumber } from '../../Utils/formatedNumber';

interface props {
  orderUser: IProductOrder;
  action: any;
}
export const CardBasic = ({
  orderUser: { titleOrder, desc, price, image, isCashback },
  action,
}: props) => {
  const [disableButton, setDisableButton] = useState(false);

  return (
    <div className='flex flex-col justify-center'>
      <div className='relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-md mx-auto border border-white bg-white'>
        <div className='w-full md:w-1/3 bg-white grid place-items-center'>
          <img src={image} alt='tailwind logo' className='rounded-xl w-full' />
        </div>
        <div className='w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3'>
          <h3 className='font-black text-gray-700 md:text-[1.3rem] text-xl'>
            {titleOrder}
          </h3>
          <p className='md:text-[0.8rem] text-gray-500 text-base'>{desc}</p>

          <div className='flex  flex-col md:flex-row justify-between items-center '>
            <p className='text-[1rem] font-black text-gray-700'>
              ${formatedNumber(price)}
            </p>
            {isCashback && (
              <div className='my-1 sm:my-0 h-4 bg-orange-400 flex items-center rounded-lg w-24 justify-center'>
                <p className='font-bold text-white text-[.6rem]'>
                  Claim your prize
                </p>
              </div>
            )}
          </div>

          <button
            disabled={disableButton}
            onClick={(e) => {
              setDisableButton(true);
              setTimeout(() => {
                setDisableButton(false);
              }, 3000);
              action(e, {
                userId: userId.toString(),
                payMethod: isCashback ? 'Points' : 'Cash',
                listProducts: [titleOrder],
                total: Number(price),
                points: 0,
              });
            }}
            className={`bg-indigo-500 text-white rounded ${
              !disableButton && 'hover:bg-indigo-700'
            } p-1 `}
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};
