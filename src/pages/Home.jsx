import { useContext } from 'react'
import Transaction from '../Components/Transaction/Transaction'
import ResumeTransaction from '../Components/ResumeTransaction/ResumeTransactions'
import TotalWallet from '../Components/TotalWallet/TotalWallet'
import ButtonFloating from '../Components/ButtonFloating/ButtonFloating'
import { TransactionContext } from '../Context/TransactionContext'

import './home.css'

const Home = () => {
  const { lsTransaction, resumenTransactions } = useContext(TransactionContext)

  return (
    <div className='home'>
      <TotalWallet />
      {lsTransaction !== undefined && lsTransaction !== null && (
        <ResumeTransaction resume={resumenTransactions} />
      )}

      {lsTransaction !== null && (
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
