import { useContext } from 'react'
import Transaction from '../Components/Transaction/Transaction'
import ResumeTransaction from '../Components/ResumeTransaction/ResumeTransactions'
import TotalWallet from '../Components/TotalWallet/TotalWallet'
import ButtonFloating from '../Components/ButtonFloating/ButtonFloating'
import { TransactionContext } from '../Context/TransactionContext'

import './home.css'
import AlertRight from '../Components/Alert/AlertRight'
import { useAlert } from '../Context/AlertContext'

const Home = () => {
  const { lsTransaction, resumenTransactions } = useContext(TransactionContext)
  const { showAlert, typeAlerts } = useAlert()

  return (
    <div className='home'>
      <TotalWallet />
      {lsTransaction.length !== 0 && <ResumeTransaction resume={resumenTransactions} />}

      <AlertRight />
      {lsTransaction.length !== 0 && (
        <div className='listMonth-transaction'>
          {lsTransaction.map((item, key) => {
            return (
              <Transaction
                transaction={item}
                key={key}
              />
            )
          })}
        </div>
      )}
      <ButtonFloating />
    </div>
  )
}

export default Home
