import { useState } from 'react';

import './transaction.css';

import {
   AiOutlineDown,
   AiOutlineUp,
   AiFillGift,
   AiFillShopping,
   AiFillHome,
} from 'react-icons/ai';

import { SiShopify } from 'react-icons/si';

const Transaction = ({ transaction }) => {
   // const transaction = {
   //    date: {
   //       dayName: 'Martes',
   //       day: '25',
   //       month: 'Octubre',
   //       year: '2026',
   //    },
   //    totalDay: {
   //       income: '250',
   //       expenses: '100',
   //    },
   //    data: [
   //       {
   //          type: 'income',
   //          category: 'comida',
   //          amount: '250',
   //       },
   //       {
   //          type: 'expense',
   //          category: 'renta',
   //          amount: '500',
   //       },
   //       {
   //          type: 'income',
   //          category: 'comida',
   //          amount: '12.25',
   //       },
   //       {
   //          type: 'expense',
   //          category: 'comida',
   //          amount: '12.25',
   //       },
   //       {
   //          type: 'expense',
   //          category: 'compras',
   //          amount: '12.25',
   //       },
   //       {
   //          type: 'expense',
   //          category: 'comida',
   //          amount: '12.25',
   //       },
   //       {
   //          type: 'expense',
   //          category: 'renta',
   //          amount: '12.25',
   //       },
   //    ],
   // };

   const [seeMoreDetails, setSeeMoreDetails] = useState(false);

   const renderIconType = (category) => {
      switch (category) {
         case 'comida':
            return <AiFillGift />;
         case 'compras':
            return <AiFillShopping />;
         case 'renta':
            return <AiFillHome />;
         default:
            return <SiShopify />;
      }
   };

   return (
      <div className='transaction'>
         <div className='transaction-data'>
            <div className='transaction-date'>
               <span className='transaction-date-day'>{transaction.date.day}</span>
               <div>
                  <span>{transaction.date.dayName}</span>
                  <br />
                  <span className='transaction-date-dayName'>
                     {transaction.date.month.slice(0, 3)}. {transaction.date.year}
                  </span>
               </div>
            </div>
            <div className='transaction-wallet'>
               <span className='wallet-incomes'>
                  $ {parseFloat(transaction.totalDay.income).toFixed(2)}
               </span>
               <br />
               <span className='wallet-expenses'>
                  $ {parseFloat(transaction.totalDay.expenses).toFixed(2)}
               </span>
            </div>

            {seeMoreDetails ? (
               <AiOutlineUp
                  key={1}
                  className='icon-showMoreDetails'
                  onClick={() => {
                     setSeeMoreDetails(!seeMoreDetails);
                  }}
               />
            ) : (
               <AiOutlineDown
                  key={2}
                  className='icon-showMoreDetails'
                  onClick={() => {
                     setSeeMoreDetails(!seeMoreDetails);
                  }}
               />
            )}
         </div>
         <div
            className={`transaction-moreDetails ${
               seeMoreDetails ? 'seeMoreDetails' : 'notseeMoreDetails'
            }`}
         >
            {transaction.data.map((item, key) => {
               return (
                  <div
                     key={key}
                     className={`transaction-detail ${
                        item.type === 'income'
                           ? 'transaction-income'
                           : 'transaction-expense'
                     }`}
                  >
                     <div>
                        {renderIconType(item.category)}
                        <span> {item.category}</span>
                     </div>
                     <span>$ {parseFloat(item.amount).toFixed(2)}</span>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default Transaction;
