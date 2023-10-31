import { useContext } from 'react'
import Transaction from '../Components/Transaction/Transaction'
import ResumeTransactionsMonthYear from '../Components/ResumeTransaction/ResumeTransactionsMonthYear'
import ResumeTransactionsDay from '../Components/ResumeTransaction/ResumeTransactionsDay'
import TotalWallet from '../Components/TotalWallet/TotalWallet'
import ButtonFloating from '../Components/ButtonFloating/ButtonFloating'
import { TransactionContext } from '../Context/TransactionContext'

import './home.css'
import AlertRight from '../Components/Alert/AlertRight'

const Home = () => {
  const { lsTransactionFiltered, resumenTransactions } = useContext(TransactionContext)

  return (
    <div className='home'>
      <TotalWallet />
      <ResumeTransactionsMonthYear resume={resumenTransactions} />

      <AlertRight />
      {lsTransactionFiltered.length !== 0 && (
        <div className='listMonth-transaction'>
          {lsTransactionFiltered.map((item, key) => {
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
