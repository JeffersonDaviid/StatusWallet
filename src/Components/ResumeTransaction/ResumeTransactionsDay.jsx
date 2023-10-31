/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { TransactionContext } from '../../Context/TransactionContext'

import './resumeTransactionsDay.css'

import {
  AiOutlineDown,
  AiOutlineUp,
  AiFillShopping,
  AiFillHome,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from 'react-icons/ai'
import {
  MdOutlineFoodBank,
  MdOutlineLocalHospital,
  MdOutlineCardTravel,
} from 'react-icons/md'
import { RiBillFill } from 'react-icons/ri'
import { SiShopify } from 'react-icons/si'
import { GiMoneyStack, GiGraduateCap } from 'react-icons/gi'
import { ImGift } from 'react-icons/im'
import { FaBus } from 'react-icons/fa'
import ButtonPrimary from '../Buttons/ButtonPrimary'

const ResumeTransactionsDay = () => {
  const { resumeDayTransactions } = useContext(TransactionContext)

  const renderNameType = (category) => {
    switch (category) {
      case 'salary':
        return 'Salario'
      case 'gift':
        return 'Regalo'
      case 'food':
        return 'Comida'
      case 'transport':
        return 'Transporte'
      case 'shop':
        return 'Compras'
      case 'rent':
        return 'Alquiler'
      case 'health':
        return 'Salud'
      case 'education':
        return 'Educación'
      case 'travel':
        return 'Viajes'
      case 'bills':
        return 'Facturas'
      case 'otherIncomes':
        return 'Otros'
      case 'otherExpenses':
        return 'Otros'
      default:
        return 'Sin especificar'
    }
  }
  const renderIconType = (category) => {
    switch (category) {
      case 'salary':
        return <GiMoneyStack className='icon' />
      case 'gift':
        return <ImGift />
      case 'food':
        return <MdOutlineFoodBank className='icon' />
      case 'transport':
        return <FaBus />
      case 'shop':
        return <AiFillShopping className='icon' />
      case 'rent':
        return <AiFillHome className='icon' />
      case 'health':
        return <MdOutlineLocalHospital className='icon' />
      case 'education':
        return <GiGraduateCap className='icon' />
      case 'travel':
        return <MdOutlineCardTravel className='icon' />
      case 'bills':
        return <RiBillFill className='icon' />
      case 'otherIncomes':
        return <AiOutlineArrowUp className='icon' />
      case 'otherExpenses':
        return <AiOutlineArrowDown className='icon' />
      default:
        return <SiShopify />
    }
  }

  return (
    <main className='transaction resumeTransactionsDay'>
      <header className='transaction-date'>
        <strong className='transaction-date-day'>{resumeDayTransactions.date.day}</strong>
        <div>
          <label>{resumeDayTransactions.date.dayName}</label>
          <br />
          <strong className='transaction-date-dayName'>
            {resumeDayTransactions.date.month.slice(0, 3)}.{' '}
            {resumeDayTransactions.date.year}
          </strong>
        </div>

        <div className='transaction-wallet'>
          <strong className='wallet-incomes'>
            $ {parseFloat(resumeDayTransactions.totalDay.incomes).toFixed(2)}
          </strong>
          <br />
          <strong className='wallet-expenses'>
            $ {parseFloat(resumeDayTransactions.totalDay.expenses).toFixed(2)}
          </strong>
        </div>
      </header>

      {resumeDayTransactions.data.map((item, key) => {
        return (
          <section
            className='transactionDay-data'
            key={key}
          >
            <div className='transactionDay-information'>
              <label className='icon'>{renderIconType(item.category)}</label>

              <div>
                <strong className=' '>{renderNameType(item.category)}</strong>

                <br />
                <label>{item.destination}</label>
              </div>

              <em className='transaction-description'>
                {item.description.length !== 0 && <small> - {item.description}</small>}
              </em>

              <label
                className={`${
                  item.type === 'income' ? 'transaction-income' : 'transaction-expense'
                }`}
              >
                $ {parseFloat(item.amount).toFixed(2)}
              </label>

              {/* <label>X</label> */}
            </div>
          </section>
        )
      })}

      <ButtonPrimary
        to='/'
        values='REGRESAR'
      />
    </main>
  )
}

export default ResumeTransactionsDay
