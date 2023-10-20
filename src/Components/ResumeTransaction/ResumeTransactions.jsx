import React from 'react';
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from 'react-icons/hi';
import { FaFaceLaughBeam, FaFaceSadCry, FaFaceGrinBeamSweat } from 'react-icons/fa6';
import { MdDateRange } from 'react-icons/md';

import './resumeTransactions.css';

const ResumeTransaction = ({ resume }) => {
   return (
      <div className='resumen-container'>
         <div className='detail-container'>
            <HiOutlineArrowSmDown
               className='icon-statusIncomes'
               style={{ color: 'green' }}
            />
            <div>
               <span>Ingresos</span>
               <br />
               <b style={{ color: 'green' }}>
                  <span>${parseFloat(resume.incomes).toFixed(2)}</span>
               </b>
            </div>
         </div>
         <div className='detail-container'>
            <HiOutlineArrowSmUp
               className='icon-statusExpenses'
               style={{ color: 'red' }}
            />
            <div>
               <span>Egresos</span>
               <br />
               <b style={{ color: 'red' }}>
                  <span>${parseFloat(resume.expenses).toFixed(2)}</span>
               </b>
            </div>
         </div>
         <div className='detail-container'>
            <MdDateRange
               className='icon-statusPeriod'
               style={{ color: 'lightsalmon' }}
            />
            <div>
               <span>Periodo</span>
               <br />
               <span>
                  <b>{resume.date}</b>
               </span>
            </div>
         </div>
         <div className='detail-container'>
            {resume.incomes - resume.expenses > 0 && (
               <span className='icon-statusWallet'>😆</span>
            )}
            {resume.incomes - resume.expenses === 0 && (
               <span className='icon-statusWallet'>🥲</span>
            )}
            {resume.incomes - resume.expenses < 0 && (
               <span className='icon-statusWallet'>😥</span>
            )}
            {/* {total > 0 && <FaFaceLaughBeam className='icon-statusWallet' />}
            {total === 0 && <FaFaceGrinBeamSweat className='icon-statusWallet' />}
            {total < 0 && <FaFaceSadCry className='icon-statusWallet' />} */}
            <div>
               <span> Estado</span>
               <br />
               <b>
                  <span>${parseFloat(resume.incomes - resume.expenses).toFixed(2)}</span>
               </b>
            </div>
         </div>
      </div>
   );
};

export default ResumeTransaction;
