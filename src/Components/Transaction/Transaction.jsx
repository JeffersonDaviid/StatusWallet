/* eslint-disable react/prop-types */
import { useState } from 'react'

import './transaction.css'

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

const Transaction = ({ transaction }) => {
  const [seeMoreDetails, setSeeMoreDetails] = useState(false)

  const renderIconType = (category) => {
    switch (category) {
      case 'salary':
        return <GiMoneyStack />
      case 'gift':
        return <ImGift />
      case 'food':
        return <MdOutlineFoodBank />
      case 'transport':
        return <FaBus />
      case 'shop':
        return <AiFillShopping />
      case 'rent':
        return <AiFillHome />
      case 'health':
        return <MdOutlineLocalHospital />
      case 'education':
        return <GiGraduateCap />
      case 'travel':
        return <MdOutlineCardTravel />
      case 'bills':
        return <RiBillFill />
      case 'otherIncomes':
        return <AiOutlineArrowUp />
      case 'otherExpenses':
        return <AiOutlineArrowDown />
      default:
        return <SiShopify />
    }
  }

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
            $ {parseFloat(transaction.totalDay.incomes).toFixed(2)}
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
              setSeeMoreDetails(!seeMoreDetails)
            }}
          />
        ) : (
          <AiOutlineDown
            key={2}
            className='icon-showMoreDetails'
            onClick={() => {
              setSeeMoreDetails(!seeMoreDetails)
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
                item.type === 'income' ? 'transaction-income' : 'transaction-expense'
              }`}
            >
              <div>
                {renderIconType(item.category)}
                <span> {item.category}</span>
              </div>
              <span>$ {parseFloat(item.amount).toFixed(2)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Transaction
