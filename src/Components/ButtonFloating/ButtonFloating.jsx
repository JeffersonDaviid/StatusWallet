import { useState } from 'react'
import { VscAdd } from 'react-icons/vsc'
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from 'react-icons/hi'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { AiOutlineClose } from 'react-icons/ai'

import './buttonFloating.css'
import { Link } from 'react-router-dom'

const ButtonFloating = () => {
  const [showActions, setShowActions] = useState(false)

  return (
    <div className={`buttonActions ${showActions ? 'buttonFloating' : ''}`.trim()}>
      <Link
        to='/StatusWallet/transaccion'
        className='icon-showActions'
      >
        <VscAdd />
      </Link>
      {/* <div
            className={`actionsLink-container ${
               showActions ? 'actions-open' : 'actions-close'
            }`.trim()}
         >
            <div>
               <Link
                  to='/StatusWallet/transaccion'
                  onClick={() => {
                     setIsTransactionTransferSelected(true);
                  }}
               >
                  <span>Transferencia</span>
                  <LiaExchangeAltSolid className='icon-action' />
               </Link>
            </div>
            <div>
               <Link
                  to='/StatusWallet/transaccion'
                  onClick={() => {
                     setIsTransactionIncomeSelected(true);
                     setIsTransactionTransferSelected(false);
                  }}
               >
                  <span>Ingresos</span>
                  <HiOutlineArrowSmUp className='icon-action' />
               </Link>
            </div>
            <div>
               <Link
                  to='/StatusWallet/transaccion'
                  onClick={() => {
                     setIsTransactionIncomeSelected(false);
                     setIsTransactionTransferSelected(false);
                  }}
               >
                  <span>Egresos</span>
                  <HiOutlineArrowSmDown className='icon-action' />
               </Link>
            </div>
         </div> */}

      {/* {showActions ? (
        <AiOutlineClose
          className='icon-showActions'
          onClick={() => {
            setShowActions(!showActions)
          }}
        />
      ) : (
        <VscAdd
          className='icon-showActions'
          onClick={() => {
            setShowActions(!showActions)
          }}
        />
      )} */}
    </div>
  )
}

export default ButtonFloating
