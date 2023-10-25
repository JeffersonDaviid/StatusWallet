import React from 'react';
import { BiWallet } from 'react-icons/bi';
import { AiTwotoneBank, AiOutlineEdit } from 'react-icons/ai';

import './totalWallet.css';

const TotalWallet = () => {
   return (
      <div className='totalWallet'>
         <div className='totalWallet-container'>
            <span>Total disponible:</span>
            <br />
            <span>$ {(230.0).toFixed(2)}</span>
         </div>
         <div className='totalCash-container'>
            <BiWallet />
            <span>${(30).toFixed(2)}</span>
         </div>
         <div className='totalBank-container'>
            <AiTwotoneBank />
            <span>${(200).toFixed(2)}</span>
         </div>
         <div className='manageWallet'>
            <AiOutlineEdit /> <span>Editar cuentas</span>
         </div>
      </div>
   );
};

export default TotalWallet;
