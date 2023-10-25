import { useState, useContext } from 'react'
import { TransactionContext } from '../../Context/TransactionContext'

import { BiWallet } from 'react-icons/bi'
import {
  AiTwotoneBank,
  AiFillShopping,
  AiFillHome,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from 'react-icons/ai'
import { CgDetailsMore } from 'react-icons/cg'
import {
  MdAttachMoney,
  MdDateRange,
  MdOutlineFoodBank,
  MdOutlineLocalHospital,
  MdOutlineCardTravel,
} from 'react-icons/md'
import { RiBillFill } from 'react-icons/ri'
import { GiMoneyStack, GiGraduateCap } from 'react-icons/gi'
import { ImGift } from 'react-icons/im'
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from 'react-icons/hi'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { FaBus } from 'react-icons/fa'

import ButtonPrimary from '../Buttons/ButtonPrimary'
import ButtonSecondary from '../Buttons/ButtonSecondary'
import './income.css'

const TransactionInput = () => {
  const { handleSetNewTransaction } = useContext(TransactionContext)
  const [isTransactionIncomeSelected, setIsTransactionIncomeSelected] = useState(false)
  const [isTransactionTransferSelected, setIsTransactionTransferSelected] =
    useState(false)

  const [newTransaction, setNewIncomeTransaction] = useState({
    date: dateConverter(getTodayDate()),
    type: 'expense',
    amount: 0,
    destination: 'wallet',
    category: 'food',
    description: '',
  })

  const updateNewIncomeData = (property, newValue) => {
    setNewIncomeTransaction((prev) => ({
      ...prev,
      [property]: newValue,
    }))
  }

  return (
    <form
      id='inputTrasactionForm'
      className='transactionContainer'
    >
      <h2>TRANSACCION</h2>

      <fieldset className='typeTransactionContainer'>
        <legend>Tipo:</legend>

        <div className='type-itemContainer'>
          <input
            type='radio'
            name='typeTransaction'
            id='income'
            value='income'
            required
            onClick={(evt) => {
              updateNewIncomeData('type', evt.target.value)
              setIsTransactionIncomeSelected(true)
              setIsTransactionTransferSelected(false)
            }}
          />
          <HiOutlineArrowSmDown className='icon' />
          <label htmlFor='income'>Ingreso</label>
        </div>

        <div className='type-itemContainer'>
          <input
            type='radio'
            name='typeTransaction'
            id='expense'
            value='expense'
            defaultChecked
            onClick={(evt) => {
              updateNewIncomeData('type', evt.target.value)
              setIsTransactionIncomeSelected(false)
              setIsTransactionTransferSelected(false)
            }}
          />
          <HiOutlineArrowSmUp className='icon' />
          <label htmlFor='expense'>Egreso</label>
        </div>
        {/* <div className='type-itemContainer'>
          <input
            type='radio'
            name='typeTransaction'
            id='transfer'
            value='transfer'
                         onClick={(evt) => {
              updateNewIncomeData('type', evt.target.value)
              setIsTransactionTransferSelected(true)
            }}
          />
          <LiaExchangeAltSolid className='icon' />
          <label htmlFor='transfer'>Transferencia</label>
        </div> */}
      </fieldset>

      <div className='amountContainer'>
        <MdAttachMoney className='icon' />
        <input
          type='number'
          placeholder='Ingrese la cantidad'
          required
          onChange={(evt) => {
            updateNewIncomeData('amount', evt.target.value)
          }}
        />
      </div>

      <fieldset className='acountContainer'>
        {isTransactionIncomeSelected && isTransactionTransferSelected === false && (
          <legend>Seleccione destino:</legend>
        )}

        {isTransactionIncomeSelected === false &&
          isTransactionTransferSelected === false && <legend>Seleccione origen:</legend>}

        <div className='acount-walletContainer'>
          <input
            type='radio'
            name='origen'
            id='wallet'
            value='wallet'
            defaultChecked
            onClick={(evt) => {
              updateNewIncomeData('destination', evt.target.value)
            }}
          />
          <BiWallet className='icon' />
          <label htmlFor='wallet'>Billetera</label>
        </div>

        <div className='acount-bankContainer'>
          <input
            type='radio'
            name='origen'
            id='bank'
            value='bank'
            onClick={(evt) => {
              updateNewIncomeData('destination', evt.target.value)
            }}
          />
          <AiTwotoneBank className='icon' />
          <label htmlFor='bank'>Banco</label>
        </div>
      </fieldset>

      {isTransactionIncomeSelected && isTransactionTransferSelected === false && (
        <fieldset className='categoryContainer'>
          <legend>Seleccione categoria:</legend>

          <div className='category-itemContainer'>
            <input
              type='radio'
              name='category'
              id='salary'
              value='salary'
              defaultChecked
              onClick={(evt) => {
                updateNewIncomeData('category', evt.target.value)
              }}
            />
            <GiMoneyStack className='icon' />
            <label htmlFor='salary'>Salario</label>
          </div>
          <div className='category-itemContainer'>
            <input
              type='radio'
              name='category'
              id='gift'
              value='gift'
              onClick={(evt) => {
                updateNewIncomeData('category', evt.target.value)
              }}
            />
            <ImGift className='icon' />
            <label htmlFor='gift'>Regalo</label>
          </div>
          <div className='category-itemContainer'>
            <input
              type='radio'
              name='category'
              id='otherIncomes'
              value='otherIncomes'
              onClick={(evt) => {
                updateNewIncomeData('category', evt.target.value)
              }}
            />
            <AiOutlineArrowUp className='icon' />
            <label htmlFor='otherIncomes'>Otros</label>
          </div>
        </fieldset>
      )}

      {isTransactionIncomeSelected === false &&
        isTransactionTransferSelected === false && (
          <fieldset className='categoryContainer'>
            <legend>Seleccione categoria:</legend>

            <div className='category-itemContainer'>
              <input
                type='radio'
                name='category'
                id='food'
                value='food'
                defaultChecked
                onClick={(evt) => {
                  updateNewIncomeData('category', evt.target.value)
                }}
              />
              <MdOutlineFoodBank className='icon' />
              <label htmlFor='food'>Alimentos</label>
            </div>

            <div className='category-itemContainer'>
              <input
                type='radio'
                name='category'
                id='gift'
                value='gift'
                onClick={(evt) => {
                  updateNewIncomeData('category', evt.target.value)
                }}
              />
              <ImGift className='icon' />
              <label htmlFor='gift'>Regalo</label>
            </div>

            <div className='category-itemContainer'>
              <input
                type='radio'
                name='category'
                id='transport'
                value='transport'
                onClick={(evt) => {
                  updateNewIncomeData('category', evt.target.value)
                }}
              />
              <FaBus className='icon' />
              <label htmlFor='transport'>Transporte</label>
            </div>

            <div className='category-itemContainer'>
              <input
                type='radio'
                name='category'
                id='shop'
                value='shop'
                onClick={(evt) => {
                  updateNewIncomeData('category', evt.target.value)
                }}
              />
              <AiFillShopping className='icon' />
              <label htmlFor='shop'>Compras</label>
            </div>

            <div className='category-itemContainer'>
              <input
                type='radio'
                name='category'
                id='rent'
                value='rent'
                onClick={(evt) => {
                  updateNewIncomeData('category', evt.target.value)
                }}
              />
              <AiFillHome className='icon' />
              <label htmlFor='rent'>Renta</label>
            </div>

            <div className='category-itemContainer'>
              <input
                type='radio'
                name='category'
                id='health'
                value='health'
                onClick={(evt) => {
                  updateNewIncomeData('category', evt.target.value)
                }}
              />
              <MdOutlineLocalHospital className='icon' />
              <label htmlFor='health'>Salud</label>
            </div>

            <div className='category-itemContainer'>
              <input
                type='radio'
                name='category'
                id='education'
                value='education'
                onClick={(evt) => {
                  updateNewIncomeData('category', evt.target.value)
                }}
              />
              <GiGraduateCap className='icon' />
              <label htmlFor='education'>Educación</label>
            </div>

            <div className='category-itemContainer'>
              <input
                type='radio'
                name='category'
                id='travel'
                value='travel'
                onClick={(evt) => {
                  updateNewIncomeData('category', evt.target.value)
                }}
              />
              <MdOutlineCardTravel className='icon' />
              <label htmlFor='travel'>Viajes</label>
            </div>

            <div className='category-itemContainer'>
              <input
                type='radio'
                name='category'
                id='bills'
                value='bills'
                onClick={(evt) => {
                  updateNewIncomeData('category', evt.target.value)
                }}
              />
              <RiBillFill className='icon' />
              <label htmlFor='bills'>Facturas</label>
            </div>
            <div className='category-itemContainer'>
              <input
                type='radio'
                name='category'
                id='otherExpenses'
                value='otherExpenses'
                onClick={(evt) => {
                  updateNewIncomeData('category', evt.target.value)
                }}
              />
              <AiOutlineArrowDown className='icon' />
              <label htmlFor='otherExpenses'>Otros</label>
            </div>
          </fieldset>
        )}

      <div className='detailsContainer'>
        <CgDetailsMore className='icon' />
        <input
          type='text'
          placeholder='Añardir descripción'
          onChange={(evt) => {
            updateNewIncomeData('description', evt.target.value)
          }}
        />
      </div>

      <div className='dateContainer'>
        <MdDateRange className='icon' />
        <input
          type='date'
          required
          defaultValue={getTodayDate()}
          onChange={(evt) => {
            updateNewIncomeData('date', dateConverter(evt.target.value))
          }}
        />
      </div>

      <div className='buttonsContainer'>
        <ButtonSecondary
          to='/'
          values='Cancelar'
        />

        <ButtonPrimary
          to='/'
          values='Guardar'
          className='btn btn-primary'
          type='submit'
          form='inputTrasactionForm'
          onClick={(e) => {
            // e.preventDefault()
            if (newTransaction.amount !== 0) handleSetNewTransaction(newTransaction)
          }}
        />
      </div>
    </form>
  )
}

const dateConverter = (date) => {
  const partesFecha = date.split('-')
  const dia = partesFecha[2]
  const mes = partesFecha[1]
  const año = partesFecha[0]

  const fechaFormateada = new Date(`${mes}/${dia}/${año}`)
  const opciones = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  const fechaFinal = fechaFormateada.toLocaleDateString('es-ES', opciones)

  const partesFecha2 = fechaFinal.split(' ')

  const dateFinal = {
    dayName:
      partesFecha2[0].charAt(0).toUpperCase() +
      partesFecha2[0].substring(1, partesFecha2[0].length - 1),
    day: partesFecha2[1],
    month: partesFecha2[3].charAt(0).toUpperCase() + partesFecha2[3].substring(1, 10),
    year: partesFecha2[5],
  }
  // console.log(dateFinal);

  return dateFinal
}

const getTodayDate = () => {
  const currentDate = new Date()
  currentDate.setUTCHours(currentDate.getUTCHours() - 5) // Ecuador está en UTC-5
  return currentDate.toISOString().split('T')[0]
}

export default TransactionInput
