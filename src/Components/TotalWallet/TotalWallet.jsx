import { useContext } from 'react'
import { BiWallet } from 'react-icons/bi'
import { AiTwotoneBank, AiOutlineEdit } from 'react-icons/ai'

import { TransactionContext } from '../../Context/TransactionContext'
import './totalWallet.css'

const TotalWallet = () => {
  const { totalMoney } = useContext(TransactionContext)

  return (
    <div className='totalWallet'>
      <div className='totalWallet-container'>
        <span>Total disponible:</span>
        <br />
        <span>$ {(totalMoney.bank + totalMoney.wallet).toFixed(2)}</span>
      </div>
      <div className='totalCash-container'>
        <BiWallet />
        <span>${totalMoney.wallet.toFixed(2)}</span>
      </div>
      <div className='totalBank-container'>
        <AiTwotoneBank />
        <span>${totalMoney.bank.toFixed(2)}</span>
      </div>
      <div className='manageWallet'>
        <AiOutlineEdit /> <span>Editar cuentas</span>
      </div>
    </div>
  )
}

export default TotalWallet
